import { showToast } from "../../libs/toast.js";

// =========================================================
// DOM
// =========================================================

const deletePlaylistModal = document.querySelector("#delete-playlist-modal");

const deletePlaylistName = document.querySelector("#delete-playlist-name");

const closeDeleteModalButton = document.querySelector(
    "#btn-close-delete-modal",
);

const cancelDeleteButton = document.querySelector(
    "#btn-cancel-delete-playlist",
);

const confirmDeleteButton = document.querySelector(
    "#btn-confirm-delete-playlist",
);

// =========================================================
// EDIT PLAYLIST MODAL
// =========================================================

const createEditPlaylistModal = () => {
    if (document.querySelector("#edit-playlist-modal")) {
        return;
    }

    const modal = document.createElement("div");

    modal.id = "edit-playlist-modal";

    modal.className =
        "fixed inset-0 z-50 hidden items-center justify-center bg-black/70 p-4";

    modal.innerHTML = `
        <div
            class="w-full max-w-md rounded-xl bg-[#282828] p-6 text-white shadow-2xl"
        >
            <div class="mb-5 flex items-center justify-between">
                <h2 class="text-xl font-bold">
                    Edit playlist
                </h2>

                <button
                    id="edit-playlist-close"
                    type="button"
                    class="text-2xl text-[#B3B3B3] hover:text-white"
                >
                    &times;
                </button>
            </div>

            <div class="flex flex-col gap-4">

                <div>
                    <label class="mb-2 block text-sm font-semibold">
                        Cover
                    </label>

                    <button
                        id="edit-playlist-cover-button"
                        type="button"
                        class="group relative h-36 w-36 overflow-hidden rounded-md bg-[#3E3E3E]"
                    >
                        <img
                            id="edit-playlist-cover-preview"
                            src=""
                            alt="Playlist cover"
                            class="h-full w-full object-cover"
                        />

                        <div
                            class="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                            <i class="fa-solid fa-pen text-xl text-white"></i>

                            <span
                                class="mt-1 text-xs font-semibold text-white"
                            >
                                Change cover
                            </span>
                        </div>
                    </button>
                </div>

                <div>
                    <label class="mb-2 block text-sm font-semibold">
                        Name
                    </label>

                    <input
                        id="edit-playlist-name"
                        type="text"
                        class="w-full rounded-md bg-[#3E3E3E] px-3 py-2 outline-none focus:ring-2 focus:ring-[#1DB954]"
                    />
                </div>

                <div>
                    <label class="mb-2 block text-sm font-semibold">
                        Description
                    </label>

                    <textarea
                        id="edit-playlist-description"
                        rows="4"
                        class="w-full resize-none rounded-md bg-[#3E3E3E] px-3 py-2 outline-none focus:ring-2 focus:ring-[#1DB954]"
                    ></textarea>
                </div>

                <label class="flex cursor-pointer items-center gap-3">
                    <input
                        id="edit-playlist-public"
                        type="checkbox"
                        class="h-4 w-4 accent-[#1DB954]"
                    />

                    <span class="text-sm">
                        Public playlist
                    </span>
                </label>

                <div class="flex justify-end gap-3 pt-2">
                    <button
                        id="edit-playlist-cancel"
                        type="button"
                        class="rounded-full px-5 py-2 text-sm font-semibold text-[#B3B3B3] hover:text-white"
                    >
                        Cancel
                    </button>

                    <button
                        id="edit-playlist-save"
                        type="button"
                        class="rounded-full bg-white px-5 py-2 text-sm font-bold text-black hover:scale-105"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
};

createEditPlaylistModal();

// =========================================================
// STATE
// =========================================================

let state = {
    detailData: null,
    isOwnPlaylist: false,
    isLikedSongs: false,
};

// =========================================================
// FILE INPUT
// =========================================================

const playlistCoverInput = document.createElement("input");

playlistCoverInput.type = "file";
playlistCoverInput.accept = "image/*";
playlistCoverInput.className = "hidden";

document.body.appendChild(playlistCoverInput);

// =========================================================
// INIT
// =========================================================

export const initPlaylistModal = (initialState) => {
    state = {
        ...state,
        ...initialState,
    };

    bindEvents();
};

// =========================================================
// UPDATE STATE
// =========================================================

export const updatePlaylistModalState = (newState) => {
    state = {
        ...state,
        ...newState,
    };
};

// =========================================================
// OPEN EDIT
// =========================================================

export const openEditPlaylistModal = () => {
    const { detailData, isOwnPlaylist } = state;

    if (!isOwnPlaylist || !detailData) {
        return;
    }

    const modal = document.querySelector("#edit-playlist-modal");

    const coverPreview = document.querySelector("#edit-playlist-cover-preview");

    const nameInput = document.querySelector("#edit-playlist-name");

    const descriptionInput = document.querySelector(
        "#edit-playlist-description",
    );

    const publicInput = document.querySelector("#edit-playlist-public");

    if (
        !modal ||
        !coverPreview ||
        !nameInput ||
        !descriptionInput ||
        !publicInput
    ) {
        console.error("Edit playlist modal elements not found");
        return;
    }

    const rawImageUrl = detailData.image_url || "";

    const imageUrl = rawImageUrl.startsWith("http")
        ? rawImageUrl
        : rawImageUrl
          ? `${import.meta.env.VITE_API_BASE_URL}${rawImageUrl}`
          : "";

    coverPreview.src = imageUrl;

    nameInput.value = detailData.name || "";

    descriptionInput.value = detailData.description || "";

    publicInput.checked = Boolean(detailData.is_public);

    modal.classList.remove("hidden");
    modal.classList.add("flex");

    nameInput.focus();
};

// =========================================================
// CLOSE EDIT
// =========================================================

export const closeEditPlaylistModal = () => {
    const modal = document.querySelector("#edit-playlist-modal");

    if (!modal) {
        return;
    }

    modal.classList.add("hidden");
    modal.classList.remove("flex");
};

// =========================================================
// UPDATE PLAYLIST
// =========================================================

const updatePlaylist = async () => {
    const nameInput = document.querySelector("#edit-playlist-name");

    const descriptionInput = document.querySelector(
        "#edit-playlist-description",
    );

    const publicInput = document.querySelector("#edit-playlist-public");

    const { detailData } = state;

    if (!nameInput || !descriptionInput || !publicInput || !detailData?.id) {
        return;
    }

    const name = nameInput.value.trim();

    const description = descriptionInput.value.trim();

    const is_public = publicInput.checked;

    if (!name) {
        showToast("Playlist name is required");
        return;
    }

    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/playlists/${detailData.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name,
                description,
                is_public,
            }),
        },
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update playlist");
    }

    state.detailData = {
        ...detailData,
        ...(data && typeof data === "object" ? data : {}),
        name,
        description,
        is_public,
    };

    closeEditPlaylistModal();

    if (state.onUpdated) {
        await state.onUpdated(state.detailData);
    }

    showToast("Playlist updated successfully");
};

// =========================================================
// UPLOAD COVER
// =========================================================

const uploadPlaylistCover = async (file) => {
    const { detailData } = state;

    if (!detailData?.id) {
        throw new Error("Playlist ID not found");
    }

    const token = localStorage.getItem("access_token");

    if (!token) {
        throw new Error("Access token not found");
    }

    const formData = new FormData();

    formData.append("cover", file);

    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/upload/playlist/${detailData.id}/cover`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        },
    );

    const result = await response.json();

    console.log("UPLOAD RESPONSE:", result);

    if (!response.ok) {
        throw new Error(result.message || "Failed to upload playlist cover");
    }

    const uploadedImageUrl = result.file?.url;

    if (!uploadedImageUrl) {
        throw new Error("Upload succeeded but image URL was not returned");
    }

    // Backend upload file xong nhưng image_url playlist vẫn null.
    // Vì vậy phải PUT lại playlist để lưu image_url.

    const updateResponse = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/playlists/${detailData.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                image_url: uploadedImageUrl,
            }),
        },
    );

    const updateResult = await updateResponse.json();

    console.log("UPDATE PLAYLIST RESPONSE:", updateResult);

    if (!updateResponse.ok) {
        throw new Error(
            updateResult.message || "Failed to update playlist cover",
        );
    }

    const fullImageUrl = uploadedImageUrl.startsWith("http")
        ? uploadedImageUrl
        : `${import.meta.env.VITE_API_BASE_URL}${uploadedImageUrl}`;

    state.detailData = {
        ...state.detailData,
        image_url: fullImageUrl,
    };

    const coverPreview = document.querySelector("#edit-playlist-cover-preview");

    if (coverPreview) {
        coverPreview.src = fullImageUrl;
    }

    if (state.onUpdated) {
        await state.onUpdated(state.detailData);
    }

    showToast("Playlist cover updated");

    window.dispatchEvent(new Event("library:refresh"));
};

// =========================================================
// OPEN COVER PICKER
// =========================================================

const openCoverPicker = () => {
    const { detailData, isOwnPlaylist, isLikedSongs } = state;

    if (!detailData || !isOwnPlaylist || isLikedSongs) {
        return;
    }

    playlistCoverInput.click();
};

// =========================================================
// DELETE MODAL
// =========================================================

export const openDeletePlaylistModal = () => {
    const { detailData, isOwnPlaylist, isLikedSongs } = state;

    if (!detailData || !isOwnPlaylist || isLikedSongs) {
        return;
    }

    deletePlaylistName.textContent = detailData.name || "this playlist";

    confirmDeleteButton.disabled = false;
    confirmDeleteButton.textContent = "Delete";

    deletePlaylistModal.classList.remove("hidden");
    deletePlaylistModal.classList.add("flex");
};

export const closeDeletePlaylistModal = () => {
    deletePlaylistModal.classList.add("hidden");
    deletePlaylistModal.classList.remove("flex");
};

// =========================================================
// DELETE PLAYLIST
// =========================================================

const deletePlaylist = async () => {
    const { detailData } = state;

    if (!detailData?.id) {
        return;
    }

    try {
        confirmDeleteButton.disabled = true;
        confirmDeleteButton.textContent = "Deleting...";

        const token = localStorage.getItem("access_token");

        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/playlists/${detailData.id}`,
            {
                method: "DELETE",
                headers: token
                    ? {
                          Authorization: `Bearer ${token}`,
                      }
                    : {},
            },
        );

        if (!response.ok) {
            const result = await response.json().catch(() => ({}));

            throw new Error(result.message || "Failed to delete playlist");
        }

        closeDeletePlaylistModal();

        window.dispatchEvent(new Event("library:refresh"));

        window.location.href = "/";
    } catch (error) {
        console.error("Failed to delete playlist:", error);

        confirmDeleteButton.disabled = false;
        confirmDeleteButton.textContent = "Delete";

        showToast("Failed to delete playlist");
    }
};

// =========================================================
// EVENTS
// =========================================================

let eventsBound = false;

const bindEvents = () => {
    if (eventsBound) {
        return;
    }

    eventsBound = true;

    document.addEventListener("click", async (event) => {
        // Close Edit
        if (event.target.closest("#edit-playlist-close")) {
            closeEditPlaylistModal();
            return;
        }

        // Cancel Edit
        if (event.target.closest("#edit-playlist-cancel")) {
            closeEditPlaylistModal();
            return;
        }

        // Save Edit
        if (event.target.closest("#edit-playlist-save")) {
            try {
                await updatePlaylist();
            } catch (error) {
                console.error(error);

                showToast("Failed to update playlist");
            }

            return;
        }

        // Edit Button
        if (event.target.closest("#btn-edit-playlist")) {
            openEditPlaylistModal();
            return;
        }

        // Delete Button
        if (event.target.closest("#btn-delete-playlist")) {
            openDeletePlaylistModal();
            return;
        }

        // Edit Modal Cover
        if (event.target.closest("#edit-playlist-cover-button")) {
            openCoverPicker();
            return;
        }

        // Detail Cover
        if (event.target.closest("#btn-change-playlist-cover")) {
            openCoverPicker();
        }
    });

    playlistCoverInput.addEventListener("change", async () => {
        const file = playlistCoverInput.files?.[0];

        if (!file) {
            return;
        }

        try {
            await uploadPlaylistCover(file);
        } catch (error) {
            console.error("Failed to upload playlist cover:", error);

            showToast("Failed to upload playlist cover");
        } finally {
            playlistCoverInput.value = "";
        }
    });

    closeDeleteModalButton?.addEventListener("click", closeDeletePlaylistModal);

    cancelDeleteButton?.addEventListener("click", closeDeletePlaylistModal);

    deletePlaylistModal?.addEventListener("click", (event) => {
        if (event.target === deletePlaylistModal) {
            closeDeletePlaylistModal();
        }
    });

    confirmDeleteButton?.addEventListener("click", deletePlaylist);
};
