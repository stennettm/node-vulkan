/*
 * MACHINE GENERATED, DO NOT EDIT
 * GENERATED BY node-vulkan v0.0.1
 */
#include "utils.h"
#include "index.h"
#include "VkClearValue.h"

Nan::Persistent<v8::FunctionTemplate> _VkClearValue::constructor;

_VkClearValue::_VkClearValue() {
  
}

_VkClearValue::~_VkClearValue() {
  //printf("VkClearValue deconstructed!!\n");
}

void _VkClearValue::Initialize(Nan::ADDON_REGISTER_FUNCTION_ARGS_TYPE target) {
  Nan::HandleScope scope;

  // constructor
  v8::Local<v8::FunctionTemplate> ctor = Nan::New<v8::FunctionTemplate>(_VkClearValue::New);
  constructor.Reset(ctor);
  ctor->InstanceTemplate()->SetInternalFieldCount(1);
  ctor->SetClassName(Nan::New("VkClearValue").ToLocalChecked());

  // prototype
  v8::Local<v8::ObjectTemplate> proto = ctor->PrototypeTemplate();
  
  SetPrototypeAccessor(proto, Nan::New("color").ToLocalChecked(), Getcolor, Setcolor, ctor);
  SetPrototypeAccessor(proto, Nan::New("depthStencil").ToLocalChecked(), GetdepthStencil, SetdepthStencil, ctor);
  Nan::Set(target, Nan::New("VkClearValue").ToLocalChecked(), ctor->GetFunction());
}

NAN_METHOD(_VkClearValue::New) {
  if (info.IsConstructCall()) {
    _VkClearValue* self = new _VkClearValue();
    self->Wrap(info.Holder());
    
    if (info[0]->IsObject()) {
      v8::Local<v8::Object> obj = info[0]->ToObject();
      v8::Local<v8::String> sAccess0 = Nan::New("color").ToLocalChecked();
      v8::Local<v8::String> sAccess1 = Nan::New("depthStencil").ToLocalChecked();
      if (obj->Has(sAccess0)) info.This()->Set(sAccess0, obj->Get(sAccess0));
      if (obj->Has(sAccess1)) info.This()->Set(sAccess1, obj->Get(sAccess1));
      
    }
    
    info.GetReturnValue().Set(info.Holder());
  } else {
    Nan::ThrowError("VkClearValue constructor cannot be invoked without 'new'");
  }
};

// color
NAN_GETTER(_VkClearValue::Getcolor) {
  _VkClearValue *self = Nan::ObjectWrap::Unwrap<_VkClearValue>(info.This());
  if (self->color.IsEmpty()) {
    info.GetReturnValue().SetNull();
  } else {
    v8::Local<v8::Object> obj = Nan::New(self->color);
    info.GetReturnValue().Set(obj);
  }
}NAN_SETTER(_VkClearValue::Setcolor) {
  _VkClearValue *self = Nan::ObjectWrap::Unwrap<_VkClearValue>(info.This());
  // js
  if (!(value->IsNull())) {
    Nan::Persistent<v8::Object, v8::CopyablePersistentTraits<v8::Object>> obj(value->ToObject());
    self->color = obj;
  } else {
    //self->color = Nan::Persistent<v8::Object, v8::CopyablePersistentTraits<v8::Object>>(Nan::Null());
  }
  // vulkan
  if (!(value->IsNull())) {
    _VkClearColorValue* obj = Nan::ObjectWrap::Unwrap<_VkClearColorValue>(value->ToObject());
    self->instance.color = obj->instance;
  } else {
    memset(&self->instance.color, 0, sizeof(VkClearColorValue));
  }
}// depthStencil
NAN_GETTER(_VkClearValue::GetdepthStencil) {
  _VkClearValue *self = Nan::ObjectWrap::Unwrap<_VkClearValue>(info.This());
  if (self->depthStencil.IsEmpty()) {
    info.GetReturnValue().SetNull();
  } else {
    v8::Local<v8::Object> obj = Nan::New(self->depthStencil);
    info.GetReturnValue().Set(obj);
  }
}NAN_SETTER(_VkClearValue::SetdepthStencil) {
  _VkClearValue *self = Nan::ObjectWrap::Unwrap<_VkClearValue>(info.This());
  // js
  if (!(value->IsNull())) {
    Nan::Persistent<v8::Object, v8::CopyablePersistentTraits<v8::Object>> obj(value->ToObject());
    self->depthStencil = obj;
  } else {
    //self->depthStencil = Nan::Persistent<v8::Object, v8::CopyablePersistentTraits<v8::Object>>(Nan::Null());
  }
  // vulkan
  if (!(value->IsNull())) {
    _VkClearDepthStencilValue* obj = Nan::ObjectWrap::Unwrap<_VkClearDepthStencilValue>(value->ToObject());
    self->instance.depthStencil = obj->instance;
  } else {
    memset(&self->instance.depthStencil, 0, sizeof(VkClearDepthStencilValue));
  }
}