import { App } from "aws-cdk-lib";
import { describe, expect, test } from "vitest";
import { CdkStack } from "../lib/cdk-stack";
import { serializer } from "./snapshot-plugin";

describe("CDK Snapshot Tests", () => {
	test("Matches infrastructure snapshot", () => {
		const app = new App();
		const stack = new CdkStack(app, "TestStack");
		const template = JSON.stringify(
			app.synth().getStackArtifact(stack.artifactId).template,
			null,
			2,
		);
		expect.addSnapshotSerializer(serializer); // シリアライザーを追加
		expect(template).toMatchSnapshot();
	});
});
