import { useGetNotificationsByUserEmail } from "@/apis/notifications";
import Centralizer from "@/components/centralizer";
import LoadingSpinner from "@/components/loading-spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserContext } from "@/contexts/user-context";
import { Notification } from "@/interfaces/types";
import { useContext } from "react";

export default function Inbox() {
  // const userNotifications = fakeNotifications.filter(
  //   (notification) => notification.user_id === 4
  // );
  const { user } = useContext(UserContext);
  console.log(user);

  const { data: userNotifications = [], isPending } =
    useGetNotificationsByUserEmail(user?.user_email || "");

  if (isPending) {
    return (
      <Centralizer className="top-1/2">
        <LoadingSpinner className="fill-blue-500" />
      </Centralizer>
    );
  }

  if (userNotifications.length === 0) {
    return (
      <Centralizer className="top-1/2 flex gap-1">
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <p className="text-gray-800 dark:text-white">No notifications yet</p>
      </Centralizer>
    );
  }

  return (
    <div className="p-4 w-full">
      <p className="w-full opacity-0">
        sdkl;fjhs;
        poiwesfhpoewrhigtnpovjnupfsiulfidjgpodfwjgo[wjkdv[odsakjv[dfkjv[odasvkjsnfow;reiha;gjiie;qijgbi;orewqijg;jv
      </p>
      <h1 className="font-bold mb-4 w-full">Inbox</h1>
      <div className="overflow-x-auto w-full">
        <Table className="min-w-full bg-white border border-gray-200">
          <TableHeader>
            <TableRow>
              <TableHead className="py-2 px-4 border-b">Message</TableHead>
              <TableHead className="py-2 px-4 border-b">Created At</TableHead>
              <TableHead className="py-2 px-4 border-b">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userNotifications.map((notification: Notification) => (
              <TableRow key={notification.notification_id}>
                <TableCell className="py-2 px-4 border-b">
                  {notification.message}
                </TableCell>
                <TableCell className="py-2 px-4 border-b">
                  {new Date(notification.created_at).toLocaleString()}
                </TableCell>
                <TableCell className="py-2 px-4 border-b">
                  {/* {notification.is_read && (
                    <img src="/check.svg" width={30} height={30} />
                  )} */}
                  <img src="/check.svg" width={30} height={30} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
