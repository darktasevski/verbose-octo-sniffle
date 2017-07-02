#include <node.h>
#include <v8.h>

void Method(const v8::FunctionCallbackInfo<v8::Value>& args) {
  v8::Isolate* isolate = args.GetIsolate();
  v8::HandleScope scope(isolate);
  args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, "World!"));
}

void init(v8::Local<v8::Object> target) {
  // The world method that exports to outside for JS.
  NODE_SET_METHOD(target, "world", Method);
}

NODE_MODULE(hello, init);
