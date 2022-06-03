/* Copyright 2020 Confluent Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

// cli config

const title = "BLANK Humanity App Confluent Cloud client";

exports.configFromEnv = async function(topic) {  
  const config = {
    "bootstrap.servers": process.env.bootstrapServers,
    "sasl.username": process.env.saslUsername,
    "sasl.password": process.env.saslPassword,
    'security.protocol': process.env.securityProtocol,
    'sasl.mechanisms': process.env.saslMechanisms
  }
  const opts = {
    'topic': topic
  }
  return { ...opts, ...config };
};
