import { Container, Group, Text, Stack, Anchor, Divider } from "@mantine/core";
import {
  IconBrandTelegram,
  IconBrandInstagram,
  IconBrandFacebook,
  IconPhone,
  IconMail,
} from "@tabler/icons-react";
import classes from "./Footer.module.css";

const socialLinks = [
  {
    icon: IconBrandTelegram,
    href: "https://t.me/rediska_uz",
    label: "Telegram",
  },
  {
    icon: IconBrandInstagram,
    href: "https://instagram.com/rediska.uz",
    label: "Instagram",
  },
  {
    icon: IconBrandFacebook,
    href: "https://facebook.com/rediska.uz",
    label: "Facebook",
  },
];

const footerLinks = [
  { label: "О нас", href: "/about" },
  { label: "Доставка и оплата", href: "/delivery" },
  { label: "Контакты", href: "/contacts" },
  { label: "Пользовательское соглашение", href: "/terms" },
  { label: "Политика конфиденциальности", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className={classes.footer}>
      <Container size="xl">
        <div className={classes.inner}>
          <div className={classes.section}>
            <Text className={classes.logo}>Rediska</Text>
            <Text size="sm" c="dimmed" mt="xs">
              Доставка продуктов на дом
            </Text>
          </div>

          <div className={classes.section}>
            <Text className={classes.sectionTitle}>Контакты</Text>
            <Stack gap="xs">
              <Group gap="xs">
                <IconPhone size={16} />
                <Anchor href="tel:+998901234567" c="dimmed" size="sm">
                  +998 90 123 45 67
                </Anchor>
              </Group>
              <Group gap="xs">
                <IconMail size={16} />
                <Anchor href="mailto:info@rediska.uz" c="dimmed" size="sm">
                  info@rediska.uz
                </Anchor>
              </Group>
            </Stack>
          </div>

          <div className={classes.section}>
            <Text className={classes.sectionTitle}>Информация</Text>
            <Stack gap="xs">
              {footerLinks.map((link) => (
                <Anchor key={link.label} href={link.href} c="dimmed" size="sm">
                  {link.label}
                </Anchor>
              ))}
            </Stack>
          </div>

          <div className={classes.section}>
            <Text className={classes.sectionTitle}>Мы в соцсетях</Text>
            <Group gap="md" mt="xs">
              {socialLinks.map((social) => (
                <Anchor
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className={classes.socialLink}
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </Anchor>
              ))}
            </Group>
          </div>
        </div>

        <Divider my="md" />

        <Group justify="space-between" className={classes.bottom}>
          <Text size="xs" c="dimmed">
            © {new Date().getFullYear()} Rediska. Все права защищены.
          </Text>
          <Text size="xs" c="dimmed">
            Ташкент, Узбекистан
          </Text>
        </Group>
      </Container>
    </footer>
  );
}
