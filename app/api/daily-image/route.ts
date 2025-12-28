import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const files = await fs.readdir(publicDir);
    
    // Filter for image files only (exclude common non-image files)
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      // Include jpg, jpeg, png, gif, webp but exclude icon files
      if (!['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
        return false;
      }
      // Exclude icon and placeholder files
      if (file.includes('icon') || file.includes('placeholder') || file.includes('apple')) {
        return false;
      }
      return true;
    }).sort(); // Sort alphabetically for consistency

    // Map to public URL paths
    const images = imageFiles.map(file => `/${file}`);

    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));

    // Select image based on day (ensures same image all day)
    const imageIndex = daysSinceEpoch % images.length;
    const dailyImage = images[imageIndex];

    return Response.json({
      image: dailyImage,
      allImages: images,
      dayIndex: daysSinceEpoch,
      totalImages: images.length,
      currentIndex: imageIndex,
    });
  } catch (error) {
    console.error('Error reading images:', error);
    return Response.json({
      error: 'Failed to load images',
      image: '/placeholder.svg',
      allImages: [],
      totalImages: 0,
    }, { status: 500 });
  }
}
