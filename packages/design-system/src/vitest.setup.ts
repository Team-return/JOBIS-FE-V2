import { expect, beforeAll } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { setProjectAnnotations } from "@storybook/react-vite";
import * as previewAnnotations from "../.storybook/preview";

expect.extend(matchers);
const project = setProjectAnnotations(previewAnnotations);
beforeAll(project.beforeAll);
