import { mapGetters, mapActions } from "vuex";
import {
  ADVISER_GETTERS,
  ADVISER_ACTIONS,
} from "@/modules/adviser/store/types";
import { MODULES } from "@/utils/constants";

export const adviserVuexMixin = {
  computed: {
    ...mapGetters({
      adviserx_getInvitations: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_GETTERS.GET_INVITATIONS}`,
      adviserx_getHasMemberships: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_GETTERS.GET_HAS_MEMBERSHIPS}`,
      adviserx_getTeam: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_GETTERS.GET_TEAM}`,
      adviserx_getProposals: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_GETTERS.GET_PROPOSALS}`,
    }),
  },
  methods: {
    ...mapActions({
      adviserx_onUpdateInvitation: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_ACTIONS.UPDATE_INVITATION}`,
      adviserx_onFetchInvitations: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_ACTIONS.FETCH_INVITATIONS}`,
      adviserx_onFetchMemberships: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_ACTIONS.GET_MEMBERSHIPS}`,
      adviserx_onFetchTeam: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_ACTIONS.FETCH_TEAM}`,
      adviserx_onFetchPendingProposals: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_ACTIONS.FETCH_PENDING_PROPOSALS}`,
      adviserx_onFetchApprovedProposal: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_ACTIONS.FETCH_APPROVED_PROPOSAL}`,
      adviserx_onFetchOnePendingProposal: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_ACTIONS.FETCH_ONE_PENDING_PROPOSAL}`,
      adviserx_onFetchOneApprovedProposal: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_ACTIONS.FETCH_ONE_APPROVED_PROPOSAL}`,
      adviserx_onUpdateProposal: `${MODULES.ADVISER_MODULE_PATH}${ADVISER_ACTIONS.UPDATE_PROPOSAL}`,
    }),
  },
};
