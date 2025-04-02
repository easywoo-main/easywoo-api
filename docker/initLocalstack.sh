#!/bin/bash

awslocal s3 mb s3://"${S3_BUCKET_NAME}"

echo "Bucket created: ${S3_BUCKET_NAME}"

awslocal ses verify-email-identity --email-address easywoo.main@gmail.com

