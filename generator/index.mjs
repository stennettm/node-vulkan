import fs from "fs";
import https from "https";

import pkg from "../package.json";

import patchAST from "./generators/ast-patch";
import generateAST from "./generators/ast";
import generateCalls from "./generators/calls";
import generateEnums from "./generators/enums";
import generateIndex from "./generators/index";
import generateStructs from "./generators/structs";
import generateHandles from "./generators/handles";
import generateGyp from "./generators/gyp";
import generatePackage from "./generators/package";
import generateUtils from "./generators/utils";
import generateWindow from "./generators/window";

import { formatVkVersion } from "./utils";

const GEN_FILE_NOTICE = `/*
 * MACHINE GENERATED, DO NOT EDIT
 * GENERATED BY ${pkg.name} v${pkg.version}
 */
`;

let totalFiles = 0;
let writtenFiles = 0;
let writtenBytes = 0;
let writtenLines = 0;

const structWhiteList = [
  "VkPhysicalDeviceFeatures",
  "VkDeviceQueueCreateInfo",
  "VkDeviceCreateInfo",
  "VkBindImagePlaneMemoryInfo",
  "VkImageSubresourceRange",
  "VkApplicationInfo",
  "VkInstanceCreateInfo",
  "VkBufferCreateInfo",
  "VkExtent2D",
  "VkExtent3D",
  "VkOffset2D",
  "VkOffset3D",
  "VkRect2D",
  "VkClearRect",
  "VkImageMemoryBarrier",
  "VkPhysicalDeviceProperties",
  "VkPhysicalDeviceLimits",
  "VkPhysicalDeviceSparseProperties",
  "VkQueueFamilyProperties",
  "VkPhysicalDeviceMemoryProperties",
  "VkMemoryHeap",
  "VkMemoryType",
  "VkQueue",
  "VkSurfaceFormatKHR",
  "VkSurfaceCapabilitiesKHR",
  "VkPresentModeKHR",
  "VkSwapchainCreateInfoKHR",
  "VkSwapchainKHR",
  "VkImageViewCreateInfo",
  "VkComponentMapping",
  "VkLayerProperties",
  "VkShaderModuleCreateInfo",
  "VkShaderModule",
  "VkPipelineShaderStageCreateInfo",
  "VkSpecializationInfo",
  "VkSpecializationMapEntry",
  "VkPipelineVertexInputStateCreateInfo",
  "VkPipelineInputAssemblyStateCreateInfo",
  "VkVertexInputBindingDescription",
  "VkVertexInputAttributeDescription",
  "VkViewport",
  "VkPipelineViewportStateCreateInfo",
  "VkPipelineRasterizationStateCreateInfo",
  "VkPipelineMultisampleStateCreateInfo",
  "VkPipelineColorBlendAttachmentState",
  "VkPipelineColorBlendStateCreateInfo",
  "VkPipelineLayoutCreateInfo",
  "VkPushConstantRange",
  "VkAttachmentDescription",
  "VkAttachmentReference",
  "VkSubpassDescription",
  "VkRenderPassCreateInfo",
  "VkSubpassDependency",
  "VkGraphicsPipelineCreateInfo",
  "VkPipelineDynamicStateCreateInfo",
  "VkPipelineDepthStencilStateCreateInfo",
  "VkPipelineTessellationStateCreateInfo",
  "VkStencilOpState",
  "VkFramebufferCreateInfo",
  "VkCommandPoolCreateInfo",
  "VkCommandBufferAllocateInfo",
  "VkCommandBufferBeginInfo",
  "VkCommandBufferInheritanceInfo",
  "VkRenderPassBeginInfo",
  "VkClearValue",
  "VkClearDepthStencilValue",
  "VkClearColorValue",
  "VkSemaphoreCreateInfo",
  "VkSubmitInfo",
  "VkPipelineStageFlags",
  "VkSubpassDependency",
  "VkPresentInfoKHR",
  "VkMemoryRequirements",
  "VkMemoryAllocateInfo",
  "VkBufferCopy",
  "VkDescriptorSetLayoutBinding",
  "VkDescriptorSetLayout",
  "VkDescriptorPool",
  "VkDescriptorSet",
  "VkDescriptorSetLayoutCreateInfo",
  "VkDescriptorPoolCreateInfo",
  "VkDescriptorPoolSize",
  "VkDescriptorSetAllocateInfo",
  "VkWriteDescriptorSet",
  "VkDescriptorBufferInfo",
  "VkDescriptorImageInfo",
  "VkCopyDescriptorSet",
  "VkImageCreateInfo",
  "VkMemoryBarrier",
  "VkBufferMemoryBarrier",
  "VkBufferImageCopy",
  "VkImageSubresourceLayers",
  "VkSamplerCreateInfo"
];

const callsWhiteList = [
  "vkCreateDevice",
  "vkCreateInstance",
  "vkEnumeratePhysicalDevices",
  "vkGetPhysicalDeviceFeatures",
  "vkGetPhysicalDeviceProperties",
  "vkGetPhysicalDeviceQueueFamilyProperties",
  "vkGetPhysicalDeviceSurfaceSupportKHR",
  "vkGetPhysicalDeviceMemoryProperties",
  "vkGetDeviceQueue",
  "vkGetPhysicalDeviceSurfaceCapabilitiesKHR",
  "vkGetPhysicalDeviceSurfaceFormatsKHR",
  "vkGetPhysicalDeviceSurfacePresentModesKHR",
  "vkCreateSwapchainKHR",
  "vkGetSwapchainImagesKHR",
  "vkCreateImageView",
  "vkEnumerateInstanceLayerProperties",
  "vkCreateShaderModule",
  "vkCreatePipelineLayout",
  "vkCreateRenderPass",
  "vkCreateGraphicsPipelines",
  "vkCreateFramebuffer",
  "vkCreateCommandPool",
  "vkAllocateCommandBuffers",
  "vkBeginCommandBuffer",
  "vkEndCommandBuffer",
  "vkCmdBeginRenderPass",
  "vkCmdEndRenderPass",
  "vkCmdBindPipeline",
  "vkCmdDraw",
  "vkCreateSemaphore",
  "vkAcquireNextImageKHR",
  "vkQueueSubmit",
  "vkQueuePresentKHR",
  "vkCreateBuffer",
  "vkGetBufferMemoryRequirements",
  "vkAllocateMemory",
  "vkBindBufferMemory",
  "vkMapMemory",
  "vkUnmapMemory",
  "vkCmdBindVertexBuffers",
  "vkCmdCopyBuffer",
  "vkQueueWaitIdle",
  "vkCmdBindIndexBuffer",
  "vkCmdDrawIndexed",
  "vkCreateDescriptorSetLayout",
  "vkCreateDescriptorPool",
  "vkAllocateDescriptorSets",
  "vkUpdateDescriptorSets",
  "vkCmdBindDescriptorSets",
  "vkCreateImage",
  "vkGetImageMemoryRequirements",
  "vkBindImageMemory",
  "vkCmdPipelineBarrier",
  "vkCmdCopyBufferToImage",
  "vkCreateSampler",
  "vkDeviceWaitIdle",
  "vkFreeCommandBuffers",
  "vkDestroyCommandPool",
  "vkDestroyPipeline",
  "vkDestroyRenderPass",
  "vkDestroyImageView",
  "vkDestroyPipelineLayout",
  "vkDestroyShaderModule",
  "vkDestroySwapchainKHR",
  "vkDestroyFramebuffer",
  "vkCmdSetViewport",
  "vkCmdSetScissor"
];

function downloadVulkanSpecificationFile(version) {
  let path = `${pkg.config.SPEC_DIR}/${version}.xml`;
  return new Promise(resolve => {
    if (fs.existsSync(path)) return resolve({ error: null, path });
    console.log(`Downloading specification file for ${version}...`);
    let req = https.get(`https://raw.githubusercontent.com/KhronosGroup/Vulkan-Docs/v${version}/xml/vk.xml`, res => {
      if (res.statusCode !== 200) {
        req.abort();
        let err = `No specification file found for version ${version}! `;
        err += `Make sure the specification got released at: https://github.com/KhronosGroup/Vulkan-Docs/releases`;
        resolve({ error: err, path });
        return;
      }
      let total = res.headers["content-length"];
      let current = 0;
      let lastPercent = 0;
      res.on("error", (err) => resolve({ error: err, path }));
      res.on("end", () => {
        process.stderr.write("100%" + "\n\n");
        resolve({ error: null, path });
      });
      process.stderr.write("0% ");
      res.on("data", function(chunk) {
        current += chunk.length;
        let percent = Math.round(current * 100 / total);
        if (percent > lastPercent + 9) {
          lastPercent = percent;
          process.stderr.write(percent + "% ");
        }
      });
      res.pipe(fs.createWriteStream(path));
    });
  });
};

// bridged to only change the change data of a file if it's really necessary
// (the compiler seems to re-compile based on file changes..)
function writeAddonFile(path, data, encoding, includeNotice = false) {
  let source = null;
  try {
    source = fs.readFileSync(path, encoding);
  } catch(e) {};
  if (includeNotice) data = GEN_FILE_NOTICE + data;
  if (source !== data) {
    totalFiles++;
    fs.writeFileSync(path, data, encoding);
  }
  writtenFiles++;
  writtenBytes += data.length;
  writtenLines += data.split(/\r\n|\r|\n/).length;
};

function getEnumByName(enums, name) {
  for (let ii = 0; ii < enums.length; ++ii) {
    let enu = enums[ii];
    if (enu.name === name) return enu;
  };
  return null;
};

function mergeExtensionsIntoEnums(enums, exts) {
  let enuExt = {
    kind: "ENUM",
    type: "ENUM",
    name: "API_Extensions",
    children: []
  };
  let strExt = {
    kind: "ENUM",
    type: "ENUM_STRINGS",
    name: "API_Extensions_Strings",
    children: []
  };
  enums.unshift(enuExt);
  enums.unshift(strExt);
  exts.map(ext => {
    ext.members.map(member => {
      if (member.extends) {
        let enu = getEnumByName(enums, member.extends);
        enu.children.push(member);
      } else {
        if (member.isNumericValue || member.isEnumValue) {
          enuExt.children.push(member);
        }
        else if (member.isStringValue) {
          strExt.children.push(member);
        }
      }
    });
  });
};

function generateBindings(specXML, version) {
  let ast = null;
  let includes = [];
  let includeNames = [];
  // write paths
  const baseGeneratePath = pkg.config.GEN_OUT_DIR;
  const generatePath = `${baseGeneratePath}/${version}`;
  const generateSrcPath = `${generatePath}/src`;
  // reserve write dirs
  {
    // generated/
    if (!fs.existsSync(baseGeneratePath)) fs.mkdirSync(baseGeneratePath);
    // generated/version/
    if (!fs.existsSync(generatePath)) fs.mkdirSync(generatePath);
    // generated/version/src/
    if (!fs.existsSync(generateSrcPath)) fs.mkdirSync(generateSrcPath);
  }
  // introduce
  console.log(`Generating bindings for ${version}...`);
  // generate AST
  {
    console.log(`Generating AST..`);
    ast = generateAST(specXML);
    patchAST(ast);
    let str = JSON.stringify(ast, null, 2);
    writeAddonFile(`${generatePath}/ast.json`, str, "utf-8");
  }
  // filter out ast nodes by their types
  let calls = ast.filter(node => node.kind === "COMMAND_PROTO");
  let enums = ast.filter(node => node.kind === "ENUM");
  let structs = ast.filter(node => node.kind === "STRUCT");
  let handles = ast.filter(node => node.kind === "HANDLE");
  let extensions = ast.filter(node => node.kind === "EXTENSION");
  // filter by whitelist
  calls = calls.filter(call => callsWhiteList.includes(call.name));
  structs = structs.filter(struct => structWhiteList.includes(struct.name));
  // generate structs
  {
    console.log("Generating Vk structs..");
    structs.map(struct => {
      let result = generateStructs(ast, struct);
      result.includes.map(incl => includes.push(incl));
      if (includes.indexOf(struct.name) <= -1) includes.push({ name: struct.name, include: "" });
      writeAddonFile(`${generateSrcPath}/${struct.name}.h`, result.header, "utf-8", true);
      writeAddonFile(`${generateSrcPath}/${struct.name}.cpp`, result.source, "utf-8", true);
    });
  }
  // generate handles
  {
    console.log("Generating Vk handles..");
    handles.map(handle => {
      let result = generateHandles(ast, handle);
      if (includes.indexOf(handle.name) <= -1) includes.push({ name: handle.name, include: "" });
      writeAddonFile(`${generateSrcPath}/${handle.name}.h`, result.header, "utf-8", true);
      writeAddonFile(`${generateSrcPath}/${handle.name}.cpp`, result.source, "utf-8", true);
    });
  }
  // generate enums
  {
    console.log("Generating Vk enums..");
    mergeExtensionsIntoEnums(enums, extensions);
    let result = generateEnums(ast, enums);
    writeAddonFile(`${generateSrcPath}/enums.h`, result.source, "utf-8", true);
  }
  // generate calls
  {
    console.log("Generating Vk calls..");
    let result = generateCalls(ast, calls);
    writeAddonFile(`${generateSrcPath}/calls.h`, result.source, "utf-8", true);
  }
  // generate window
  {
    console.log("Generating Vk window..");
    let result = generateWindow(ast);
    writeAddonFile(`${generateSrcPath}/window.h`, result.header, "utf-8", true);
  }
  // generate includes
  {
    console.log("Generating Vk includes..");
    structs.map(struct => {
      includeNames.push(`"./src/${struct.name}.cpp"`);
    });
    handles.map(handle => {
      includeNames.push(`"./src/${handle.name}.cpp"`);
    });
    // also add the index.cpp
    includeNames.push(`"./src/index.cpp"`);
  }
  // generate binding.gyp
  {
    console.log("Generating binding.gyp..");
    let result = generateGyp(ast, version, includeNames);
    writeAddonFile(`${generatePath}/binding.gyp`, result.gyp, "utf-8");
  }
  // generate package.json
  {
    console.log("Generating package.json..");
    let result = generatePackage(ast, version);
    writeAddonFile(`${generatePath}/package.json`, result.json, "utf-8");
  }
  // generate utils
  {
    console.log("Generating utils..");
    let utilsFile = generateUtils(includes, calls);
    writeAddonFile(`${generateSrcPath}/utils.h`, utilsFile.header, "utf-8", true);
  }
  // generate indices
  {
    console.log("Generating indices..");
    let indexFile = generateIndex(ast, includes, calls);
    writeAddonFile(`${generateSrcPath}/index.h`, indexFile.header, "utf-8", true);
    writeAddonFile(`${generateSrcPath}/index.cpp`, indexFile.source, "utf-8", true);
  }
  console.log(``);
  console.log(`Generation stats:`);
  console.log(`Total files: ${totalFiles}/${writtenFiles}`);
  console.log(`Total size: ${writtenBytes * 1e-3}kb`);
  console.log(`Total lines: ${writtenLines}`);
};

let vkVersion = process.env.npm_config_vkversion;
if (!vkVersion) throw `No specification version -vkversion specified!`;
vkVersion = formatVkVersion(vkVersion);

downloadVulkanSpecificationFile(vkVersion).then(out => {
  // read specification file
  if (out.error) throw out.error;
  const specXML = fs.readFileSync(out.path, "utf-8");
  generateBindings(specXML, vkVersion);
});
