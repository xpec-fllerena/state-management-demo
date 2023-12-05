"use client"
import dynamic from "next/dynamic";
import * as themes from "@@_overrides/layouts";
import { NAME_CLIENT, ENV_CLIENT } from "@@_constants/env_costants";
import { useEffect, useState } from "react";

const useMulticlient = ({ client_prop }: any) => {
  const [client_name, set_client_name] = useState<string | undefined>(
    NAME_CLIENT
  );
  const [client_environment] = useState<string | undefined>(ENV_CLIENT);

  useEffect(() => {
    client_prop && set_client_name(client_prop);
  }, [client_prop]);

  const get_layout_path = (path: any, path_list: any) => {
    let path_overrided = path;
    //eslint-disable-next-line
    const theme: any = themes;

    for (const path_current of path_list) {
      const replaced = path_current.replaceAll("/", "?.");
      //eslint-disable-next-line
      const path_current_active = eval(`theme?.${replaced}`);

      if (!!path_current_active) {
        if (path_current_active.includes(path)) {
          path_overrided = `overrides/theme/${path_current}/${path}`;
          break;
        }
      }
    }

    return import(`./../${path_overrided}`);
  };

  const get_component: any = (path: string) => {
    const path_list = [
      `${client_name}/${client_environment}`,
      `${client_name}/base`,
      `omnix/${client_environment}`,
      `omnix/base`,
    ];

    return dynamic(() => get_layout_path(path, path_list));
  };

  return { get_component };
};

export default useMulticlient;
