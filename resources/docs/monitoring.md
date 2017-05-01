---
title: Monitoring and Alerting
keywords: service, monitoring, alerting
sidebar: myService
toc: false
---

## Monitors

All monitored metrics are available in the Datadog [dashboard](https://app.datadoghq.com/).

MyService is fully nFS compliant and all required endpoints are available using the appropiate hostnames depending on the environment.

| Environment | Hostname                      |
| ---------   | --------------------          |
| Development | https://myService.vevodev.com/ |
| Staging     | https://myService.vevostg.com/ |
| Production  | https://myService.vevoprd.com/ |

## Alerts

MyService is using VictorOps key **`ContentAcquisition`** to page on alerts triggered by Datadog or any other monitoring services in place.

Please refer to the [Content Acquisition](https://portal.victorops.com/dash/vevo-llc/#/team/contentacquisition/rotations) team page for details on schedules and escalation processes


