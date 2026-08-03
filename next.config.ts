import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // www → apex 영구 리다이렉트: 같은 내용이 두 주소로 노출되면 검색 신뢰가 쪼개진다.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.inpilot.dev" }],
        destination: "https://inpilot.dev/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
