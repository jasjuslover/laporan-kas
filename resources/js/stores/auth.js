import $axios from "../api.js";

const state = () => ({
    //
});

const mutations = {
    //
};

const actions = {
    submit({ commit }, payload) {
        localStorage.setItem("token", null);
        commit("SET_TOKEN", null, { root: true });
        // because SET_TOKEN mutations is in root stores, so add { root: true } parameter

        return new Promise((resolve, _) => {
            $axios
                .post("/login", payload)
                .then(response => {
                    if (response.data.status === "success") {
                        localStorage.setItem("token", response.data.data);
                        commit("SET_TOKEN", response.data.data, { root: true });
                    } else {
                        commit(
                            "SET_ERRORS",
                            { invalid: "Wrong email/password" },
                            { root: true }
                        );
                    }

                    resolve(response.data);
                })
                .catch(error => {
                    if (error.response.status === 422) {
                        commit("SET_ERRORS", error.response.data.errors, {
                            root: true
                        });
                    }
                });
        });
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};
