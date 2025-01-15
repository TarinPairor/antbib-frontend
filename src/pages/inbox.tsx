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
    (notification) => notification.UserID === 2
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inbox</h1>
      <div className="overflow-x-auto">
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
              <TableRow key={notification.NotificationID}>
                <TableCell className="py-2 px-4 border-b">
                  {notification.Message}
                </TableCell>
                <TableCell className="py-2 px-4 border-b">
                  {new Date(notification.CreatedAt).toLocaleString()}
                </TableCell>
                <TableCell className="py-2 px-4 border-b">
                  {notification.IsRead ? "Read" : "Unread"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
