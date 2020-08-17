export default (state = { facingMode: "user" }, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        facingMode: state.facingMode === "user" ? "environment" : "user"
      };
    default:
      return state;
  }
};
