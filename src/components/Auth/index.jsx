'use client';

import SignUp from './SignUp';
import UpdatePassword from './UpdatePassword';
import { VIEWS, useAuth } from './AuthProvider';
import SignIn from './SignIn';
import ResetPassword from './ResetPassword';

export const Auth = ({ view: initialView }) => {
  let { view } = useAuth();

  if (initialView) {
    view = initialView;
  }

  switch (view) {
    case VIEWS.UPDATE_PASSWORD:
      return <UpdatePassword />;
    case VIEWS.FORGOTTEN_PASSWORD:
      return <ResetPassword />;
    case VIEWS.SIGN_UP:
      return <SignUp />;
    default:
      return <SignIn />;
  }
};
