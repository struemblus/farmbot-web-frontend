import { Everything } from "../interfaces";
import { deleteUser } from "./actions";
import { Props } from "./interfaces";
import { getUserAccountSettings } from "../resources/selectors";
import { User } from "../auth/interfaces";
import { edit } from "../api/crud";

export function mapStateToProps(props: Everything): Props {
  let user = getUserAccountSettings(props.resources.index);
  let dispatch = props.dispatch;

  return {
    user,
    saveUser: (update: Partial<User>) => dispatch(edit(user, update)),
    enactDeletion: (password: string | undefined) => {
      dispatch(deleteUser({ password: password || "NEVER SET" }));
    },
    dispatch: Function
  };
}

