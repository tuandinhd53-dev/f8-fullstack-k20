import "../../assets/style.css";

import { httpRequest } from "../../libs/httpRequest.js";

import { playTrack, setPlayerQueue } from "../player/player.js";

import {
    renderDetail,
    renderTracks,
    renderArtistTracks,
    renderArtistAlbums,
    updateLikeUI,
    updateLibraryUI,
    showDetailPage,
    showDetailError,
    hideLoading,
} from "./detailRender.js";

import {
    initPlaylistModal,
    updatePlaylistModalState,
    openEditPlaylistModal,
    openDeletePlaylistModal,
} from "./playlistModal.js";

import { initDetailActions } from "./detailActions.js";

// =========================================================
// URL
// =========================================================

const params = new URLSearchParams(window.location.search);

const id = params.get("id");
const type = params.get("type");

console.log("DETAIL PARAMS:", {
    type,
    id,
});

// =========================================================
// STATE
// =========================================================

const state = {
    tracks: [],
    myPlaylists: [],

    isOwnPlaylist: false,
    detailType: null,

    artistAlbums: [],
    artistTracks: [],

    detailData: null,

    isLikedSongs: false,

    currentUser: null,

    onUpdated: null,
};

// =========================================================
// STATE HELPERS
// =========================================================

const getState = () => state;

const setState = (newState) => {
    Object.assign(state, newState);

    updatePlaylistModalState(state);
};

// =========================================================
// LIBRARY REFRESH
// =========================================================

const notifyLibraryUpdated = () => {
    console.log("Dispatch library refresh");

    window.dispatchEvent(new Event("library:refresh"));
};

// =========================================================
// UPDATE DETAIL AFTER PLAYLIST UPDATE
// =========================================================

const handlePlaylistUpdated = async (updatedData) => {
    setState({
        detailData: updatedData,
    });

    renderDetail(updatedData, "playlists", state);

    notifyLibraryUpdated();
};

// =========================================================
// INIT PLAYLIST MODAL
// =========================================================

initPlaylistModal({
    ...state,
    onUpdated: handlePlaylistUpdated,
});

state.onUpdated = handlePlaylistUpdated;

// =========================================================
// INIT ACTIONS
// =========================================================

initDetailActions({
    state,

    getState,

    setState,

    playTrack,

    setPlayerQueue,

    notifyLibraryUpdated,

    openEditPlaylistModal,

    openDeletePlaylistModal,
});

// =========================================================
// LOAD DETAIL
// =========================================================

const loadDetail = async () => {
    try {
        let data;

        // =================================================
        // TRACK
        // =================================================

        if (type === "tracks") {
            data = await httpRequest.get(`/api/tracks/${id}`);
        }

        // =================================================
        // OTHER DETAIL
        // =================================================
        else {
            data = await httpRequest.get(`/api/${type}/${id}`);
        }

        // =================================================
        // TRACK
        // =================================================

        if (type === "tracks") {
            const newTracks = [data];

            setState({
                tracks: newTracks,
                detailData: data,
                detailType: type,
            });

            setPlayerQueue(newTracks);

            renderTracks(newTracks);

            renderDetail(data, type, state);
        }

        // =================================================
        // ALBUM
        // =================================================
        else if (type === "albums") {
            const trackData = await httpRequest.get(
                `/api/albums/${data.id}/tracks`,
            );

            const newTracks = trackData.tracks || [];

            setState({
                tracks: newTracks,
                detailData: data,
                detailType: type,
            });

            setPlayerQueue(newTracks);

            renderTracks(newTracks);

            renderDetail(data, type, state);
        }

        // =================================================
        // PLAYLIST
        // =================================================
        else if (type === "playlists") {
            const userData = await httpRequest.get("/api/users/me");

            const currentUser = userData.user || userData;

            const isLikedSongs = data.name?.toLowerCase() === "liked songs";

            const isOwnPlaylist =
                !isLikedSongs && currentUser?.id === data.user_id;

            let normalizedTracks;

            // =============================================
            // LIKED SONGS
            // =============================================

            if (isLikedSongs) {
                const likedData = await httpRequest.get(
                    "/api/me/tracks/liked?limit=50",
                );

                normalizedTracks = (likedData.tracks || []).map((track) => ({
                    id: track.id,
                    title: track.title,
                    image_url: track.image_url,
                    audio_url: track.audio_url,
                    duration: track.duration,
                    artist_name: track.artist_name,
                    album_id: track.album_id,
                }));
            }

            // =============================================
            // NORMAL PLAYLIST
            // =============================================
            else {
                const trackData = await httpRequest.get(
                    `/api/playlists/${data.id}/tracks`,
                );

                normalizedTracks = (trackData.tracks || []).map((track) => ({
                    id: track.track_id,
                    title: track.track_title,
                    image_url: track.track_image_url,
                    audio_url: track.track_audio_url,
                    duration: track.track_duration,
                    artist_name: track.artist_name,
                    album_id: track.album_id,
                }));
            }

            setState({
                tracks: normalizedTracks,
                detailData: data,
                detailType: type,
                currentUser,
                isLikedSongs,
                isOwnPlaylist,
            });

            setPlayerQueue(normalizedTracks);

            renderTracks(normalizedTracks, isLikedSongs);

            renderDetail(data, type, state);
        }

        // =================================================
        // ARTIST
        // =================================================
        else if (type === "artists") {
            const [albumData, trackData] = await Promise.all([
                httpRequest.get(`/api/artists/${id}/albums`),

                httpRequest.get(`/api/tracks?limit=50&offset=0`),
            ]);

            const artistAlbums = albumData.albums || [];

            const artistTracks = (trackData.tracks || []).filter(
                (track) => track.artist_id === data.id,
            );

            setState({
                tracks: artistTracks,
                detailData: data,
                detailType: type,
                artistAlbums,
                artistTracks,
            });

            setPlayerQueue(artistTracks);

            renderArtistAlbums(artistAlbums);

            renderArtistTracks(artistTracks);

            renderDetail(data, type, state);
        }

        // =================================================
        // FINAL UI
        // =================================================

        updateLikeUI(Boolean(state.detailData?.is_liked));

        if (type === "albums") {
            updateLibraryUI(Boolean(state.detailData?.is_liked));
        }

        if (type === "playlists" && !state.isLikedSongs) {
            updateLibraryUI(Boolean(state.detailData?.is_following));
        }

        showDetailPage();
    } catch (error) {
        console.error("Failed to load detail:", error);

        showDetailError();
    } finally {
        hideLoading();
    }
};

// =========================================================
// START
// =========================================================

loadDetail();
