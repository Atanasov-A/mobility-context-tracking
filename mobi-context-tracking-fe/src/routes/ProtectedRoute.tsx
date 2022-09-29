import { Navigate } from "react-router-dom";
import { useAuthToken } from "../components/shared/hooks/useAuthToken";

const redirectPath = "/login";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = (props: Props) => {
  const { getToken } = useAuthToken();
  const token = getToken();

  if (!token) {
    return (
      <>
        <Navigate to={redirectPath} replace />
      </>
    );
  }

  return <>{props.children}</>;
};

export { ProtectedRoute };
