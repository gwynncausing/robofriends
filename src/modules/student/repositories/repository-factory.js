import BlogRepository from "./blog-repository";
import PostRepository from "./post-Repository";

const repositories = {
  blogs: BlogRepository,
  posts: PostRepository,
};
export default {
  get: (name) => repositories[name],
};
