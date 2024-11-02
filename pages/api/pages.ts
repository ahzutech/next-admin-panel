// pages/api/pages/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const apiUrl = 'https://api.cycoserve.com/v1/pages'; // Adjust the URL as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query; // Get the ID from the request query

  if (method === 'GET') {
    if (id) {
      // If an ID is provided, fetch a single page
      try {
        const response = await axios.get(`${apiUrl}/${id}`);

        if (response.status === 200) {
          return res.status(200).json(response.data); // Return the single page
        } else {
          return res.status(response.status).json({ message: 'Failed to retrieve page' });
        }
      } catch (error) {
        console.error('Error fetching page:', error);
        return res.status(500).json({ message: 'Error fetching page' });
      }
    } else {
      // If no ID is provided, fetch all pages
      try {
        const response = await axios.get(apiUrl);

        if (response.status === 200) {
          return res.status(200).json(response.data); // Return the list of pages
        } else {
          return res.status(response.status).json({ message: 'Failed to retrieve pages' });
        }
      } catch (error) {
        console.error('Error fetching pages:', error);
        return res.status(500).json({ message: 'Error fetching pages' });
      }
    }
  } else if (method === 'POST') {
    try {
      const pageData = req.body; // The new page data

      // Make a request to your Express backend to create a new page
      const response = await axios.post(apiUrl, pageData);

      if (response.status === 201) {
        return res.status(201).json(response.data); // Return the newly created page
      } else {
        return res.status(response.status).json({ message: 'Failed to create page' });
      }
    } catch (error) {
      console.error('Error creating page:', error);
      return res.status(500).json({ message: 'Error creating page' });
    }
  } else if (method === 'PUT') {
    if (!id) {
      return res.status(400).json({ message: 'Page ID is required' });
    }

    try {
      const pageData = req.body; // The updated page data

      // Make a request to your Express backend to update the page
      const response = await axios.put(`${apiUrl}/${id}`, pageData);

      if (response.status === 200) {
        return res.status(200).json(response.data); // Return the updated page
      } else {
        return res.status(response.status).json({ message: 'Failed to update page' });
      }
    } catch (error) {
      console.error('Error updating page:', error);
      return res.status(500).json({ message: 'Error updating page' });
    }
  } else if (method === 'DELETE') {
    if (!id) {
      return res.status(400).json({ message: 'Page ID is required' });
    }

    try {
      // Make a request to your Express backend to delete the page
      const response = await axios.delete(`${apiUrl}/${id}`);

      if (response.status === 204) {
        return res.status(204).end(); // No content
      } else {
        return res.status(response.status).json({ message: 'Failed to delete page' });
      }
    } catch (error) {
      console.error('Error deleting page:', error);
      return res.status(500).json({ message: 'Error deleting page' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
