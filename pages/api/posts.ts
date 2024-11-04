import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import formidable from 'formidable';
import fs from 'fs';
import FormData from 'form-data';

export const config = {
  api: {
    bodyParser: false,
  },
};

const apiUrl = 'https://api.cycoserve.com/v1/posts';

interface FormidableFile extends formidable.File {
  filepath: string;
  originalFilename: string | null;
  mimetype: string | null;
}

const parseForm = async (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise((resolve, reject) => {
    const form = formidable({});
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    if (id) {
      try {
        const response = await axios.get(`${apiUrl}/${id}`);
        if (response.status === 200) {
          return res.status(200).json(response.data);
        } else {
          return res.status(response.status).json({ message: 'Failed to retrieve post' });
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        return res.status(500).json({ message: 'Error fetching post' });
      }
    } else {
      try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
          return res.status(200).json(response.data);
        } else {
          return res.status(response.status).json({ message: 'Failed to retrieve posts' });
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({ message: 'Error fetching posts' });
      }
    }
  } else if (method === 'POST' || method === 'PUT') {
    try {
      const { fields, files } = await parseForm(req);
      
      // Create FormData for the API request
      const formData = new FormData();
      
      // Add all fields to formData
      Object.entries(fields).forEach(([key, value]) => {
        const fieldValue = Array.isArray(value) ? value[0] : value;
        if (fieldValue) {
          formData.append(key, fieldValue);
        }
      });

      // Add image if it exists
      const imageFiles = files.image as formidable.File[];
      if (imageFiles && imageFiles.length > 0) {
        const imageFile = imageFiles[0] as FormidableFile;
        const fileStream = fs.createReadStream(imageFile.filepath);
        formData.append('image', fileStream, {
          filename: imageFile.originalFilename || 'image',
          contentType: imageFile.mimetype || 'application/octet-stream',
        });
      }

      // Make request to backend API
      const requestConfig = {
        method: method,
        url: method === 'POST' ? apiUrl : `${apiUrl}/${id}`,
        data: formData,
        headers: formData.getHeaders(),
      };

      const response = await axios(requestConfig);

      // Clean up temporary files
      if (imageFiles && imageFiles.length > 0) {
        const imageFile = imageFiles[0] as FormidableFile;
        fs.unlinkSync(imageFile.filepath);
      }

      if (response.status === 200 || response.status === 201) {
        return res.status(response.status).json(response.data);
      } else {
        return res.status(response.status).json({ message: 'Failed to save post' });
      }
    } catch (error) {
      console.error('Error saving post:', error);
      return res.status(500).json({ message: 'Error saving post' });
    }
  } else if (method === 'DELETE') {
    if (!id) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    try {
      const response = await axios.delete(`${apiUrl}/${id}`);
      if (response.status === 204) {
        return res.status(204).end();
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
