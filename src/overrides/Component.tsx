// "use client";
// import dynamic from "next/dynamic";
// import fs from "fs";
// import path from "path";

// const ENV_CLIENT = process.env["NEXT_PUBLIC_CLIENT"];
// // const root_path = path.resolve(process.cwd());

// const Override = ({ src }: any) => {
//   try {
//     const component_core_path = path.join(process.cwd(),`./../${src}`);
//     const component_client_path = `./clients/${ENV_CLIENT}/${src}`;

//     console.log("fs.existsSync(component_core_path)", fs.existsSync(component_core_path))

//     const ComponentCore =
//       fs.existsSync(component_core_path) &&
//       dynamic(async () => import(component_core_path));
//     const ComponentClient =
//       !fs.existsSync(component_client_path) &&
//       dynamic(() => import(component_client_path));

//     const Component = ComponentClient || ComponentCore 

//     return Component;
//   } catch (error) {
//     return;
//   }
// };

// export default Override;