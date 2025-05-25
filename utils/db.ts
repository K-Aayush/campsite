// // import { PrismaClient } from "@prisma/client";

// // declare global {
// //   let prisma: PrismaClient | undefined;
// // }

// // export const db = globalThis.prisma || new PrismaClient();

// // if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

// import { PrismaClient } from "@prisma/client";

// // Define the type for the global scope
// declare global {
//   var prisma: PrismaClient | undefined;
// }

// // Using globalThis.prisma (or global.prisma) instead of directly accessing a global variable
// export const db = globalThis.prisma || new PrismaClient();

// // Only save the instance in development to prevent hot reloading issues
// if (process.env.NODE_ENV !== "production") {
//   globalThis.prisma = db;
// }

// import { PrismaClient } from "@prisma/client";

// // Define the type for the global scope
// declare global {
//   // Using a namespace to avoid 'var' while still adding to the global scope
//   namespace NodeJS {
//     interface Global {
//       prisma: PrismaClient | undefined;
//     }
//   }
// }

// // Using global.prisma with correct type
// export const db = (global as any).prisma || new PrismaClient();

// // Only save the instance in development to prevent hot reloading issues
// if (process.env.NODE_ENV !== "production") {
//   (global as any).prisma = db;
// }

// import { PrismaClient } from "@prisma/client";

// // Declare global for dev mode only to avoid duplicate clients in development
// declare global {
//   namespace NodeJS {
//     interface Global {
//       prisma: PrismaClient | undefined;
//     }
//   }
// }

// const prisma = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   globalThis.prisma = prisma;
// }

// export const db = prisma;

import { PrismaClient } from "@prisma/client";

// For Next.js 13+ and TypeScript, the correct way to extend globalThis
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Use global instead of globalThis for the prisma instance
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export const db = prisma;
