/*
 * MACHINE GENERATED, DO NOT EDIT
 * GENERATED BY node-vulkan v0.0.1
 */
#include "VkImageView.h"

Nan::Persistent<v8::FunctionTemplate> _VkImageView::constructor;

_VkImageView::_VkImageView() {}
_VkImageView::~_VkImageView() {}

void _VkImageView::Initialize(Nan::ADDON_REGISTER_FUNCTION_ARGS_TYPE target) {
  Nan::HandleScope scope;

  // Constructor
  v8::Local<v8::FunctionTemplate> ctor = Nan::New<v8::FunctionTemplate>(_VkImageView::New);
  constructor.Reset(ctor);
  ctor->InstanceTemplate()->SetInternalFieldCount(1);
  ctor->SetClassName(Nan::New("VkImageView").ToLocalChecked());

  // Prototype
  v8::Local<v8::ObjectTemplate> proto = ctor->PrototypeTemplate();

  Nan::Set(target, Nan::New("VkImageView").ToLocalChecked(), ctor->GetFunction());
}

NAN_METHOD(_VkImageView::New) {
  _VkImageView* self = new _VkImageView();
  self->Wrap(info.Holder());
  info.GetReturnValue().Set(info.Holder());
};
