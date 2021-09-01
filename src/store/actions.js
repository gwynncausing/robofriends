import Repository from "@/repositories/repository-factory";
const TestRepository = Repository.get("test");

export default {
  async test() {
    try {
      const result = await TestRepository.get();
      return result.data;
    } catch (err) {
      return err;
    }
  },
};
