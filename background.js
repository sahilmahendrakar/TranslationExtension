// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({language: 'es'}, function() {
    console.log("The language is spanish.");
  });

  chrome.storage.sync.set({active: 'true'}, function(){
    console.log("Setting active to true")
  })

  chrome.storage.sync.set({difficulty: 20}, function(){
    console.log("The difficulty is 20")
  })
});
