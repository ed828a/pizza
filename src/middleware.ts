import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token }) {
      console.log("middleware callbacks authorized token", token);

      return token?.role === "admin";
    },
  },
});

export const config = { matcher: ["/api/cloudinary"] };
