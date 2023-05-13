import * as admin from 'firebase-admin';
import { credential } from 'firebase-admin';
import { ServiceAccount, initializeApp } from 'firebase-admin/app';

const service: ServiceAccount = {
  projectId: 'lyk-graphiql',
  clientEmail: '"firebase-adminsdk-s2g4v@lyk-graphiql.iam.gserviceaccount.com',
  privateKey:
    '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCM/88B53keWJ2k\n7W2K8aAmwFP/RXbNvnC6Vmy77gYdcZkrBXkIjvjpEBYrJJ0j/erkm8vXjsYSmgN3\nqu+sKXKu2Rkoz/e/A3GAaKSAuxeB546kj3qcAs+OU2i9IxwiIYADWwxSpLM6QVjU\n2LuVcRJCosoAbVwfZPSXcN9TxnYqMGI+HEvwWZZ9fhp8TN+lom1KUBylBM3uQHD+\n6egfkjeVVtJMpKArthd0NMR+HsVGVM8lzPZ5BlFALe7ZI0XV7GepA+DmAtBhguCD\nQ5XIw6RG6gqP0sqWHuCNRVZTw8x8ywAxjfAeoVvaztI4U3/JKtDXHodJrMPRCGwg\nDuCvTSNRAgMBAAECggEALKR52HJ/iLop/6QlAM8ME/jlH3fQ68eWTYk7mCz+xqfH\nBTYQYkNSUAiF3FcVYeXtT0B8w90ynYUh/+uhQvNEmlOmgaOHH3VppGx9WTzjbn/w\nS+4Ztfe126xRB0FskOnmbCmRt0DqdlFmXM3aZrCMRYjhSE1X06DVSHW2YAIAO87p\nmhRf3XJ1TAqKDzCJ/FTAfKPgFKmgWGvUJ8+OLd6WkTfx37/MXH7jjzQSrgiZ+WYf\nYEX6TwLiTgBHVJTSO2J7p9sksJP6F3lXbkhfWFRJ1VYb/ViCcX0/dc1iDq0XLuyk\nt6afRVL35s2uh8JU62G/fjbdjQeeWAWcLt2rbFANeQKBgQDArU7ntxE7gabTKbDt\nuGL7UZE8ZoR8AR5LMfCjVttw+wgQhzaUZtzmjaBnZs6kSEquL19qAg+dBcV6Yi+D\nKP+nrhqi5IVPcnozOtOxkz7yquAgu9iKQ0KQNRJuRQbC59f6Z3TGrQLuNP7+HiBC\nn7dwG+f82Cy3dbJ2w23NCfUMtwKBgQC7VqTzSjSbQVOv7A3BQewb0KtfwaBPiELV\noxRi5O6u6t09ZS2LgZgsKXopGaQrudAVlSsRYAazoALgoL/PZ7QVf5oN6xPQS1lT\nyt61yYvfQylCMeIfPCOWW73Z97Po1pxelw3yvZ0t8MEILEBbg+yxS26naan0IXMS\ncorKu3vYNwKBgQCSA4R1Yy1i/Bjxk3mqXP5d2G2I6WPjGXHcqEblcZAw6XwuElnR\nUrZ63b8+PRHCO6qkn+/dxRwR8eq6mSfKbMp5Rx6WbTl9gJKMujrtKlocylO5WsF5\n3gjWgfGqsRKzp8Dr2XUMjtZWsMDA0RG/i4wXIH7JBQW2LjKFgAp4xN/4twKBgF2B\n+gOV3nxAN01wPc1g4kFf/qplM2d/VBzesaZLLvgQMy4Z+onPve0NJvSs380TilG7\niyu5Cp9OFyGYGyWjVbgFYRfhZpppgcTZViDW4QInu8hWrc95bSn30OOjSCHIPXTZ\nYRTwoCv2J+O0css7JkG4rRrTGwnISG/EzJI00rQxAoGBAKQelLuVglzExnPpobso\nRiD2emssvFt8TZozBR/HJBERGUqyaqGsBTBPB7wj0qtKTccoFZKdz+9dMAY23S62\nRTpIAry1iiYbAlSDrhFPaJCZakBGiUMIlRcGGRaEFYJ7pwss9mbvo7esnU6CX/pT\nkp1Jehlm0mFLDLTfzd02sJfL\n-----END PRIVATE KEY-----\n',
};

if (!admin.apps.length) {
  initializeApp({
    credential: credential.cert(service),
  });
}

export const adminSDK = admin;
