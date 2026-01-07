import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const trackUrl = searchParams.get('url');
  
  if (!trackUrl) {
    return NextResponse.json({ error: 'Missing URL' }, { status: 400 });
  }
  
  // Client ID bạn vừa tìm được (Lưu ý: ID này có thể bị đổi trong tương lai)
  const CLIENT_ID = 'gqKBMSuBw5rbN9rDRYPqKNvF17ovlObu';
  
  try {
    // Gọi API resolve của SoundCloud từ Server (Server không bị lỗi CORS)
    const apiUrl = `https://api-widget.soundcloud.com/resolve?url=${encodeURIComponent(trackUrl)}&format=json&client_id=${CLIENT_ID}`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error('SoundCloud API error');
    }
    
    const data = await response.json();
    
    // Trả về dữ liệu chi tiết
    return NextResponse.json({
      title: data.title,
      artist: data.user?.username,
    });
    
  } catch (error) {
    console.error('Proxy Error:', error);
    return NextResponse.json({ error: 'Failed to fetch info' }, { status: 500 });
  }
}