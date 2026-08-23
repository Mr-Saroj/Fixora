import API from "../../../services/api";

export const getAllTechnicians = () => {
    return API.get("/admin/technicians");
};

export const updateTechnicianAccess = (technicianId, newAccess) => {
    return API.patch(`/admin/technicians/${technicianId}/access`, { loginAccess: newAccess });
};

export const broadcastAnnouncement = (title, message, targetRole = "ALL") => {
    return API.post("/admin/broadcast", { title, message, targetRole });
};

// ✅ NEW — send to a specific user
export const sendAnnouncementToUser = (userId, title, message) => {
    return API.post(`/admin/announcements/user/${userId}`, { title, message });
};

// ✅ NEW — fetch all users for search
export const getAllUsers = () => {
    return API.get("/admin/users");
};