import { DashboardStore } from "@/zustand/dashboard";
import {
  Button,
  Card,
  Center,
  Flex,
  Group,
  Input,
  Modal,
  NumberInput,
  Text,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { LeftOverItem } from "@/utils/types";
import { nanoid } from "nanoid";
import { ReactElement, useEffect, useState } from "react";
const GlobalLayout = dynamic(() => import("@/layouts/GlobalLayout"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const DashboardLayout = dynamic(() => import("@/layouts/DashboardLayout"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
import dynamic from "next/dynamic";
import { GeneralStore } from "@/zustand/general";
import Image from "next/image";
import { supabase } from "@/supabaseClient";
export default function AdminDashboard() {
  const user = GeneralStore((state) => state.currentUser);
  const [leftOvers, setLeftOvers] = useState<LeftOverItem[] | null>(null);
  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase.from("last-bite").select("*");
      setLeftOvers(data as LeftOverItem[] | null);
    };
    fetch();
  }, []);

  return (
    <Center w="100%" h="100%" sx={{ gap: 10, flexWrap: "wrap" }}>
      {leftOvers &&
        leftOvers.map((item) => (
          <Card shadow="sm" key={item.id} padding="lg" radius="md" withBorder>
            <Card.Section>
              {item && (
                <Image
                  src={JSON.parse(item.imageUrl) || ""}
                  width={400}
                  height={400}
                  alt="image"
                />
              )}
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>{item?.name}</Text>
            </Group>

            <Text size="sm" color="dimmed">
              {item?.description}
            </Text>
            <Button variant="light" color="green" fullWidth mt="md" radius="md">
              Approve
            </Button>
          </Card>
        ))}
    </Center>
  );
}
AdminDashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <GlobalLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </GlobalLayout>
  );
};
