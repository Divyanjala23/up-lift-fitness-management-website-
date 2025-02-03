// apiService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Update with your Spring Boot backend URL

export const apiService = {
  // Members
  async getMembers() {
    const response = await axios.get(`${BASE_URL}/members`);
    return response.data;
  },

  async createMember(memberData) {
    const response = await axios.post(`${BASE_URL}/members`, memberData);
    return response.data;
  },

  async updateMember(id, memberData) {
    const response = await axios.put(`${BASE_URL}/members/${id}`, memberData);
    return response.data;
  },

  async deleteMember(id) {
    await axios.delete(`${BASE_URL}/members/${id}`);
  },

  // Trainers
  async getTrainers() {
    const response = await axios.get(`${BASE_URL}/coaches`);
    return response.data;
  },

  async createTrainer(trainerData) {
    const response = await axios.post(`${BASE_URL}/trainers`, trainerData);
    return response.data;
  },

  async updateTrainer(id, trainerData) {
    const response = await axios.put(`${BASE_URL}/trainers/${id}`, trainerData);
    return response.data;
  },

  async deleteTrainer(id) {
    await axios.delete(`${BASE_URL}/trainers/${id}`);
  },

  async approveTrainer(id) {
    const response = await axios.put(`${BASE_URL}/trainers/${id}/approve`);
    return response.data;
  },

  // Videos
  async getVideos() {
    const response = await axios.get(`${BASE_URL}/videos`);
    return response.data;
  },

  async createVideo(videoData) {
    const response = await axios.post(`${BASE_URL}/videos`, videoData);
    return response.data;
  },

  async deleteVideo(id) {
    await axios.delete(`${BASE_URL}/videos/${id}`);
  },

  // Dashboard Stats
  async getDashboardStats() {
    const response = await axios.get(`${BASE_URL}/dashboard/stats`);
    return response.data;
  },

  async getRevenueData() {
    const response = await axios.get(`${BASE_URL}/dashboard/revenue`);
    return response.data;
  },

  async getRecentActivity() {
    const response = await axios.get(`${BASE_URL}/dashboard/activity`);
    return response.data;
  }
};