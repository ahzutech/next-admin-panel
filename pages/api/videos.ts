// pages/api/videos/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const apiUrl = 'https://api.cycoserve.com/v1/videos'; // Replace with your actual backend URL

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query; // Get the ID from the request query

  switch (method) {
    case 'GET':
      if (id) {
        // If an ID is provided, fetch a single video
        try {
          const response = await axios.get(`${apiUrl}/${id}`);
          return res.status(200).json(response.data);
        } catch (error) {
          console.error('Error fetching video:', error);
          return res.status(500).json({ message: 'Error fetching video' });
        }
      } else {
        // If no ID is provided, fetch all videos
        try {
          const response = await axios.get(apiUrl);
          return res.status(200).json(response.data);
        } catch (error) {
          console.error('Error fetching videos:', error);
          return res.status(500).json({ message: 'Error fetching videos' });
        }
      }

    case 'POST':
      // Create a new video post
      try {
        const videoData = req.body; // The new video data
        const response = await axios.post(apiUrl, videoData);
        return res.status(201).json(response.data);
      } catch (error) {
        console.error('Error creating video:', error);
        return res.status(500).json({ message: 'Error creating video' });
      }

    case 'PUT':
      if (!id) {
        return res.status(400).json({ message: 'Video ID is required' });
      }

      // Update an existing video post
      try {
        const videoData = req.body; // The updated video data
        const response = await axios.put(`${apiUrl}/${id}`, videoData);
        return res.status(200).json(response.data);
      } catch (error) {
        console.error('Error updating video:', error);
        return res.status(500).json({ message: 'Error updating video' });
      }

    case 'DELETE':
      if (id) {
        // Delete a single video post
        try {
          await axios.delete(`${apiUrl}/${id}`);
          return res.status(204).end(); // No content
        } catch (error) {
          console.error('Error deleting video:', error);
          return res.status(500).json({ message: 'Error deleting video' });
        }
      } else {
        // Delete all video posts
        try {
          await axios.delete(apiUrl); // Assuming your backend supports this
          return res.status(204).end(); // No content
        } catch (error) {
          console.error('Error deleting videos:', error);
          return res.status(500).json({ message: 'Error deleting videos' });
        }
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
