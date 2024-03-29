import { User } from "@/lib/supabase/schema/types";
import { Avatar, Group, Text, Tooltip } from "@mantine/core";
import {
  differenceInHours,
  format,
  formatDistance,
  formatRelative,
} from "date-fns";
import NextLink from "next/link";

type Props = {
  user: User;
  date: string;
};

const getFormattedDate = (date: string) => {
  const now = Date.now();

  if (differenceInHours(now, date) < 24) {
    return formatDistance(date, now, { addSuffix: true });
  }
  return formatRelative(date, now);
};

export const UserTimestamp = ({ user, date }: Props) => {
  return (
    <Group>
      <NextLink href={`/profiles/${user.id}`}>
        <Avatar
          src={user.avatarUrl}
          alt={user.username || "User"}
          radius="xl"
        />
      </NextLink>
      <div>
        <Text size="sm">{user.username || "User"}</Text>
        <Tooltip label={format(date, "yyyy-MM-dd HH:mm:SS")} openDelay={300}>
          <Text size="xs" c="dimmed">
            {getFormattedDate(date)}
          </Text>
        </Tooltip>
      </div>
    </Group>
  );
};
