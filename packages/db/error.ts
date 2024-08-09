/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

const INTERNAL_SERVER_ERROR = "Quelque chose s'est mal passé";

export default class TutoringError extends Error {
  code: number;
  constructor(message: string, code?: number) {
    super(message);
    this.name = "TutoringError";
    this.code = code ?? 502;
  }
}

export const errorHandler = (error: unknown) => {
  console.error("got an error in handler : ", error);
  if (error instanceof TutoringError) {
    return new NextResponse(error.message, { status: error.code ?? 502 });
  }

  if (error instanceof ZodError) {
    return new NextResponse(error.errors[0]?.message, { status: 400 });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return new NextResponse(`le champ ${error.meta?.target} existe déjà`);
    } else if (error.code === "P2014") {
      return new NextResponse(`ID invalide: ${error.meta?.target}`, {
        status: 400,
      });
    } else if (error.code === "P2003") {
      return new NextResponse(
        `Données d'entrée invalides: ${error.meta?.target}`,
        { status: 400 },
      );
    } else {
      return new NextResponse(
        `Quelque chose s'est mal passé: ${error.message}`,
        { status: 500 },
      );
    }
  }

  return new NextResponse(INTERNAL_SERVER_ERROR, { status: 500 });
};

export const serverActionErrorHandler = (error: unknown) => {
  console.error("got an error in handler : ", error);
  if (error instanceof TutoringError) {
    return {
      errors: error.message,
      code: error.code ?? 502,
    };
  }

  if (error instanceof ZodError) {
    return {
      errors: error.errors[0]?.message!,
      code: 400,
    };
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return {
        errors: `le champ ${error.meta?.target} existe déjà`,
        code: 400,
      };
    } else if (error.code === "P2014") {
      return {
        errors: `ID invalide: ${error.meta?.target}`,
        code: 400,
      };
    } else if (error.code === "P2003") {
      return {
        errors: `Données d'entrée invalides: ${error.meta?.target}`,
        code: 400,
      };
    } else {
      return {
        errors: `Quelque chose s'est mal passé: ${error.message}`,
        code: 400,
      };
    }
  }

  return {
    errors: INTERNAL_SERVER_ERROR,
    code: 500,
  };
};
