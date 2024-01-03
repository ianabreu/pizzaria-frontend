import { FaSpinner } from "react-icons/fa";
import {
  FiAlertCircle,
  FiLogOut,
  FiRefreshCcw,
  FiUpload,
} from "react-icons/fi";

export const Icons = {
  logout: <FiLogOut />,
  alert: <FiAlertCircle />,
  refresh: <FiRefreshCcw />,
  loading: <FaSpinner className="animate-spin m-auto" />,
  upload: <FiUpload size={30} />,
};
