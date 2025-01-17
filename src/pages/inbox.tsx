import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fakeNotifications } from "@/constants/constants";

export default function Inbox() {
  const userNotifications = fakeNotifications.filter(
    (notification) => notification.user_id === 4
  );

  return (
    <div className="p-4 w-full">
      <p className="text-white w-full">
        sdkl;fjhs;
        poiwesfhpoewrhigtnpovjnupfsiulfidjgpodfwjgo[wjkdv[odsakjv[dfkjv[odasvkjsnfow;reiha;gjiie;qijgbi;orewqijg;jv
      </p>
      <h1 className="text-2xl font-bold mb-4 w-full">Inbox</h1>
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
            {userNotifications.map((notification) => (
              <TableRow key={notification.notification_id}>
                <TableCell className="py-2 px-4 border-b">
                  {notification.message}
                </TableCell>
                <TableCell className="py-2 px-4 border-b">
                  {new Date(notification.created_at).toLocaleString()}
                </TableCell>
                <TableCell className="py-2 px-4 border-b">
                  {notification.is_read && (
                    <img src="/check.svg" width={30} height={30} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
