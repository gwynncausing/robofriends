import Repository from "@/repositories/repository-factory";
const TestRepository = Repository.get("test");

export default {
  async test() {
    try {
      const response = await TestRepository.get();
      return response.data;
    } catch (err) {
      return err;
    }
  },
};
