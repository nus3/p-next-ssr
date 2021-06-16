import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';

export class HadaTestStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new iam.Role(this, 'NextSsrYHadaInstance', {
      roleName: 'NextSsrYHadaInstance',
      assumedBy: new iam.ServicePrincipal('tasks.apprunner.amazonaws.com'),
      managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName(
              'AmazonDynamoDBFullAccess',
          ),
      ],
  });
  }
}
