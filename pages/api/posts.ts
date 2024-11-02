// pages/api/posts/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const apiUrl = 'https://api.cycoserve.com/v1/posts';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query; // Get the ID from the request query

  if (method === 'GET') {
    if (id) {
      // If an ID is provided, fetch a single post
      try {
        const response = await axios.get(`${apiUrl}/${id}`);

        if (response.status === 200) {
          return res.status(200).json(response.data); // Return the single post
        } else {
          return res.status(response.status).json({ message: 'Failed to retrieve post' });
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        return res.status(500).json({ message: 'Error fetching post' });
      }
    } else {
      // If no ID is provided, fetch all posts
      try {
        const response = await axios.get(apiUrl);

        if (response.status === 200) {
          return res.status(200).json(response.data); // Return the list of posts
        } else {
          return res.status(response.status).json({ message: 'Failed to retrieve posts' });
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({ message: 'Error fetching posts' });
      }
    }
  } else if (method === 'POST') {
    try {
      const postData = req.body; // The new post data

      // Make a request to your Express backend to create a new post
      const response = await axios.post(apiUrl, postData);

      if (response.status === 201) {
        return res.status(201).json(response.data); // Return the newly created post
      } else {
        return res.status(response.status).json({ message: 'Failed to create post' });
      }
    } catch (error) {
      console.error('Error creating post:', error);
      return res.status(500).json({ message: 'Error creating post' });
    }
  } else if (method === 'PUT') {
    if (!id) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    try {
      const postData = req.body; // The updated post data

      // Make a request to your Express backend to update the post
      const response = await axios.put(`${apiUrl}/${id}`, postData);

      if (response.status === 200) {
        return res.status(200).json(response.data); // Return the updated post
      } else {
        return res.status(response.status).json({ message: 'Failed to update post' });
      }
    } catch (error) {
      console.error('Error updating post:', error);
      return res.status(500).json({ message: 'Error updating post' });
    }
  } else if (method === 'DELETE') {
    if (!id) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    try {
      // Make a request to your Express backend to delete the post
      const response = await axios.delete(`${apiUrl}/${id}`);

      if (response.status === 204) {
        return res.status(204).end(); // No content
      } else {
        return res.status(response.status).json({ message: 'Failed to delete post' });
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      return res.status(500).json({ message: 'Error deleting post' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
