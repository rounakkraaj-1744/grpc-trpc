import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader"
import path from "path"

const protoPath = path.join(__dirname, "../protobufs/", "hello.proto")
const packageDef = protoLoader.loadSync(protoPath)
const obj = grpc.loadPackageDefinition(packageDef) as any;
const Greeter = obj.hello.Greeter

// Change function name to 'hello' (lowercase first letter)
function hello(call: any, cb: any) {
    const name = call.request.name || "Rocky this side!";
    cb(null, {
        message: `Hello ${name}`
    })
}

function main() {
    const server = new grpc.Server()
    server.addService(Greeter.service, { hello })
    const addr = '0.0.0.0:50051';
    server.bindAsync(addr, grpc.ServerCredentials.createInsecure(), () => {
        console.log(`gRPC server is started ${addr}`);
    })
}

main()
