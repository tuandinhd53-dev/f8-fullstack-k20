import { httpRequest } from "../../libs/httpRequest.js";
import { showToast } from "../../libs/toast.js";

import { renderTracks, updateLikeUI, updateLibraryUI } from "./detailRender.js";

// =========================================================
// INIT
// =========================================================

export const initDetailActions = ({
    state,
    getState,
    setState,
    playTrack,
    setPlayerQueue,
    notifyLibraryUpdated,
    openEditPlaylistModal,
    openDeletePlaylistModal,
}) => {
    // =====================================================
    // DOM
    // =====================================================

    const titleElement = document.querySelector("#entity-title");

    const albumElement = document.querySelector("#entity-album");

    const trackListElement = document.querySelector("#track-list");

    const moreByListElement = document.querySelector("#more-by-list");

    const moreOptionsButton = document.querySelector("#btn-more-options");

    const moreOptionsMenu = document.querySelector("#more-options-menu");

    const addToPlaylistButton = document.querySelector("#btn-add-to-playlist");

    const playlistSubmenu = document.querySelector("#playlist-submenu");

    const playlistMenuList = document.querySelector("#playlist-menu-list");

    const toggleLibraryButton = document.querySelector("#btn-toggle-library");

    const btnFollow = document.querySelector("#btn-follow");

    const btnLike = document.querySelector("#btn-like");

    // =====================================================
    // TITLE → EDIT PLAYLIST
    // =====================================================

    titleElement?.addEventListener("click", () => {
        const current = getState();

        if (!current.isOwnPlaylist || current.isLikedSongs) {
            return;
        }

        openEditPlaylistModal();
    });

    // =====================================================
    // FOLLOW
    // =====================================================

    btnFollow?.addEventListener("click", async () => {
        try {
            const current = getState();

            if (!current.detailData) {
                return;
            }

            if (current.detailData.is_following) {
                await httpRequest.delete(
                    `/api/${current.detailType}/${current.detailData.id}/follow`,
                );
            } else {
                await httpRequest.post(
                    {},
                    `/api/${current.detailType}/${current.detailData.id}/follow`,
                );
            }

            const updatedDetailData = {
                ...current.detailData,
                is_following: !current.detailData.is_following,
            };

            setState({
                detailData: updatedDetailData,
            });

            btnFollow.textContent = updatedDetailData.is_following
                ? "Following"
                : "Follow";

            updateLibraryUI(updatedDetailData.is_following);

            notifyLibraryUpdated();

            showToast(
                updatedDetailData.is_following
                    ? "Followed successfully"
                    : "Unfollowed successfully",
            );
        } catch (error) {
            console.error(error);

            showToast("Failed to update follow");
        }
    });

    // =====================================================
    // LIKE
    // =====================================================

    btnLike?.addEventListener("click", async () => {
        try {
            const current = getState();

            if (!current.detailData) {
                return;
            }

            if (current.detailData.is_liked) {
                await httpRequest.delete(
                    `/api/${current.detailType}/${current.detailData.id}/like`,
                );
            } else {
                await httpRequest.post(
                    {},
                    `/api/${current.detailType}/${current.detailData.id}/like`,
                );
            }

            const updatedDetailData = {
                ...current.detailData,
                is_liked: !current.detailData.is_liked,
            };

            setState({
                detailData: updatedDetailData,
            });

            updateLikeUI(updatedDetailData.is_liked);

            notifyLibraryUpdated();

            showToast(
                updatedDetailData.is_liked
                    ? "Liked successfully"
                    : "Unliked successfully",
            );
        } catch (error) {
            console.error(error);

            showToast("Failed to update like");
        }
    });

    // =====================================================
    // TOGGLE LIBRARY
    // =====================================================

    toggleLibraryButton?.addEventListener("click", async () => {
        try {
            const current = getState();

            if (!current.detailData) {
                return;
            }

            // Playlist
            if (current.detailType === "playlists") {
                if (current.isLikedSongs) {
                    return;
                }

                if (current.detailData.is_following) {
                    await httpRequest.delete(
                        `/api/playlists/${current.detailData.id}/follow`,
                    );
                } else {
                    await httpRequest.post(
                        {},
                        `/api/playlists/${current.detailData.id}/follow`,
                    );
                }

                const updatedDetailData = {
                    ...current.detailData,
                    is_following: !current.detailData.is_following,
                };

                setState({
                    detailData: updatedDetailData,
                });

                updateLibraryUI(updatedDetailData.is_following);

                notifyLibraryUpdated();
            }

            // Album
            if (current.detailType === "albums") {
                if (current.detailData.is_liked) {
                    await httpRequest.delete(
                        `/api/albums/${current.detailData.id}/like`,
                    );
                } else {
                    await httpRequest.post(
                        {},
                        `/api/albums/${current.detailData.id}/like`,
                    );
                }

                const updatedDetailData = {
                    ...current.detailData,
                    is_liked: !current.detailData.is_liked,
                };

                setState({
                    detailData: updatedDetailData,
                });

                updateLibraryUI(updatedDetailData.is_liked);

                updateLikeUI(updatedDetailData.is_liked);

                notifyLibraryUpdated();
            }

            showToast("Your Library updated");
        } catch (error) {
            console.error(error);

            showToast("Failed to update Your Library");
        }
    });

    // =====================================================
    // ALBUM LINK
    // =====================================================

    albumElement?.addEventListener("click", (event) => {
        const button = event.target.closest("[data-album-id]");

        if (!button) {
            return;
        }

        const albumId = button.dataset.albumId;

        if (!albumId) {
            return;
        }

        window.location.href = `/detail.html?type=albums&id=${albumId}`;
    });

    // =====================================================
    // TRACK LIST
    // =====================================================

    trackListElement?.addEventListener("click", async (event) => {
        const current = getState();

        // =============================================
        // REMOVE FROM LIKED SONGS
        // =============================================

        const removeButton = event.target.closest(".remove-liked-button");

        if (removeButton) {
            const trackId = removeButton.dataset.trackId;

            try {
                await httpRequest.delete(`/api/tracks/${trackId}/like`);

                const newTracks = current.tracks.filter(
                    (track) => track.id !== trackId,
                );

                setState({
                    tracks: newTracks,
                });

                setPlayerQueue(newTracks);

                renderTracks(newTracks, current.isLikedSongs);

                notifyLibraryUpdated();

                showToast("Removed from Liked Songs");
            } catch (error) {
                console.error("Failed to remove from Liked Songs:", error);

                showToast("Failed to remove from Liked Songs");
            }

            return;
        }

        // =============================================
        // CLICK TRACK TITLE
        // =============================================

        const album = event.target.closest("[data-album-id]");

        if (album) {
            const trackId = album.closest("[data-id]")?.dataset.id;

            if (current.isLikedSongs) {
                window.location.href = `/detail.html?type=tracks&id=${trackId}`;

                return;
            }

            const albumId = album.dataset.albumId;

            if (!albumId) {
                return;
            }

            window.location.href = `/detail.html?type=albums&id=${albumId}`;

            return;
        }

        // =============================================
        // PLAY TRACK
        // =============================================

        const button = event.target.closest("[data-track-id]");

        if (!button) {
            return;
        }

        const trackId = button.dataset.trackId;

        const track = current.tracks.find((item) => item.id === trackId);

        if (!track) {
            return;
        }

        playTrack(track);
    });

    // =====================================================
    // MORE BY
    // =====================================================

    moreByListElement?.addEventListener("click", (event) => {
        const card = event.target.closest("[data-id]");

        if (!card) {
            return;
        }

        const { id, type } = card.dataset;

        window.location.href = `/detail.html?type=${type}&id=${id}`;
    });

    // =====================================================
    // MORE OPTIONS
    // =====================================================

    const loadMyPlaylistsForMenu = async () => {
        try {
            const data = await httpRequest.get("/api/me/playlists");

            const playlists = Array.isArray(data) ? data : data.playlists || [];

            if (!playlists.length) {
                playlistMenuList.innerHTML = `
                        <p class="px-3 py-2 text-sm text-[#B3B3B3]">
                            You don't have any playlists
                        </p>
                    `;

                return;
            }

            playlistMenuList.innerHTML = playlists
                .map(
                    (playlist) => `
                                <button
                                    type="button"
                                    data-playlist-id="${playlist.id}"
                                    class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-white transition-colors hover:bg-white/10"
                                >
                                    <div class="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded bg-[#333]">
                                        ${
                                            playlist.image_url
                                                ? `
                                                    <img
                                                        src="${playlist.image_url}"
                                                        alt=""
                                                        class="h-full w-full object-cover"
                                                    />
                                                `
                                                : `
                                                    <i class="fa-solid fa-music text-[#B3B3B3]"></i>
                                                `
                                        }
                                    </div>

                                    <span class="truncate">
                                        ${playlist.name}
                                    </span>
                                </button>
                            `,
                )
                .join("");
        } catch (error) {
            console.error("Failed to load playlists:", error);

            playlistMenuList.innerHTML = `
                    <p class="px-3 py-2 text-sm text-red-400">
                        Failed to load playlists
                    </p>
                `;
        }
    };

    moreOptionsButton?.addEventListener("click", () => {
        moreOptionsMenu?.classList.toggle("hidden");
    });

    document.addEventListener("click", (event) => {
        if (
            moreOptionsButton &&
            moreOptionsMenu &&
            !moreOptionsButton.contains(event.target) &&
            !moreOptionsMenu.contains(event.target)
        ) {
            moreOptionsMenu.classList.add("hidden");
        }
    });

    // =====================================================
    // ADD TO PLAYLIST
    // =====================================================

    addToPlaylistButton?.addEventListener("click", async () => {
        playlistSubmenu?.classList.toggle("hidden");

        if (playlistSubmenu && !playlistSubmenu.classList.contains("hidden")) {
            await loadMyPlaylistsForMenu();
        }
    });

    playlistMenuList?.addEventListener("click", async (event) => {
        const playlistButton = event.target.closest("[data-playlist-id]");

        if (!playlistButton) {
            return;
        }

        const playlistId = playlistButton.dataset.playlistId;

        const current = getState();

        if (!current.detailData) {
            return;
        }

        // Chỉ track mới có thể được thêm vào playlist
        if (current.detailType !== "tracks") {
            showToast("Only tracks can be added to a playlist");

            return;
        }

        const trackId = current.detailData.id;

        try {
            await httpRequest.post(
                {
                    track_id: trackId,
                    position: 0,
                },
                `/api/playlists/${playlistId}/tracks`,
            );

            showToast("Track added to playlist");

            playlistSubmenu?.classList.add("hidden");
            moreOptionsMenu?.classList.add("hidden");
        } catch (error) {
            console.error("Failed to add track to playlist:", error);

            showToast("Failed to add track to playlist");
        }
    });

    // =====================================================
    // EDIT / DELETE
    // =====================================================

    document.addEventListener("click", (event) => {
        if (event.target.closest("#btn-edit-playlist")) {
            openEditPlaylistModal();
            return;
        }

        if (event.target.closest("#btn-delete-playlist")) {
            openDeletePlaylistModal();
        }
    });
};
