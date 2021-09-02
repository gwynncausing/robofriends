import { FETCH_TEST } from "./types/actions";
import { SET_TEST } from "./types/mutations";
import Repository from "@/repositories/repository-factory";
const TestRepository = Repository.get("test");

export default {
  async [FETCH_TEST]({ commit }) {
    const response = await TestRepository.get();
    commit(SET_TEST, { test: response.data });
  },
};
