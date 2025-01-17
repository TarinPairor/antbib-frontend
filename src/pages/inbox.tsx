import { useGetNotificationsByUserEmail } from "@/apis/notifications";
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

  const { data: userNotifications = [] } = useGetNotificationsByUserEmail(
    user?.user_email || ""
  );

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
