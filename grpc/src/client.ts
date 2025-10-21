import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader"
import path from "path"

const protoPath = path.join(__dirname, "../protobufs/", "hello.proto")
const packageDef = protoLoader.loadSync(protoPath)
const obj = grpc.loadPackageDefinition(packageDef) as any;
const greeter = obj.hello.Greeter

const client = new greeter("localhost:50051", grpc.credentials.createInsecure())

client.Hello({ name: 'Rounakk' }, (err: Error | null, resp: any) => {
  if (err) return console.error('RPC error', err);
  console.log('Greeting:', resp.message);
});