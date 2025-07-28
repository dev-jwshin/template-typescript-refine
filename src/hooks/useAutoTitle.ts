import { useTranslate, useResource } from "@refinedev/core";

type ActionType = "list" | "create" | "edit" | "show" | "clone";

export const useAutoTitle = (action: ActionType): string => {
  const translate = useTranslate();
  const { resource } = useResource();

  const label = resource?.meta?.label || "리소스";
  const actionText = translate(`actions.${action}`);

  return `${label} ${actionText}`;
}; 