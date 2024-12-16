import { Card, CardContent } from "./ui/card";

const TikTokFeed = () => {
  return (
    <Card className="w-full max-w-md mx-auto bg-white/90 backdrop-blur">
      <CardContent className="p-4">
        <div className="aspect-[9/16] w-full">
          <blockquote 
            className="tiktok-embed" 
            cite="https://www.tiktok.com/@topjaw/video/7447084329034927392"
            data-video-id="7447084329034927392"
            style={{ maxWidth: "780px", minWidth: "288px" }}
          >
            <section>
              <a target="_blank" href="https://www.tiktok.com/@topjaw/video/7447084329034927392">@topjaw</a>
            </section>
          </blockquote>
          <script async src="https://www.tiktok.com/embed.js"></script>
        </div>
      </CardContent>
    </Card>
  );
};

export default TikTokFeed;