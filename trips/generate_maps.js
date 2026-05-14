const fs = require('fs');
const path = require('path');

const template = (data) => `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title} - 漫迹 Manji</title>
    <!-- Leaflet CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #818cf8;
            --primary-light: #c7d2fe;
            --bg-primary: #020617;
            --bg-secondary: #0f172a;
            --text-primary: #f8fafc;
            --text-secondary: #94a3b8;
            --gradient-1: linear-gradient(135deg, #818cf8 0%, #c084fc 100%);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', -apple-system, sans-serif;
        }

        body {
            background-color: var(--bg-primary);
            color: var(--text-primary);
            height: 100vh;
            display: flex;
            overflow: hidden;
        }

        /* Weather Badge */
        .weather-badge {
            position: absolute;
            top: 24px;
            right: 24px;
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 12px 20px;
            border-radius: 100px;
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            font-size: 14px;
            font-weight: 600;
        }
        
        .weather-icon {
            font-size: 20px;
        }

        /* Split View Layout */
        .sidebar {
            width: 450px;
            height: 100vh;
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(20px);
            border-right: 1px solid rgba(255, 255, 255, 0.05);
            display: flex;
            flex-direction: column;
            z-index: 10;
        }

        .map-container {
            flex: 1;
            height: 100vh;
            position: relative;
        }

        #map {
            width: 100%;
            height: 100%;
            background: var(--bg-secondary);
        }

        /* Header */
        .header {
            padding: 32px;
            background: linear-gradient(180deg, rgba(2, 6, 23, 0.9) 0%, rgba(2, 6, 23, 0) 100%);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .back-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 20px;
            transition: color 0.3s;
        }

        .back-btn:hover {
            color: var(--text-primary);
        }

        .title {
            font-size: 28px;
            font-weight: 800;
            margin-bottom: 8px;
            background: var(--gradient-1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        /* Timeline Container */
        .timeline-container {
            flex: 1;
            overflow-y: auto;
            padding: 32px;
        }

        .timeline-container::-webkit-scrollbar {
            width: 6px;
        }
        .timeline-container::-webkit-scrollbar-track {
            background: transparent;
        }
        .timeline-container::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
        }

        .day-header {
            font-size: 18px;
            font-weight: 700;
            margin: 32px 0 24px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .day-header:first-child {
            margin-top: 0;
        }

        .location-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }

        .location-card:hover, .location-card.active {
            background: rgba(129, 140, 248, 0.1);
            border-color: rgba(129, 140, 248, 0.3);
            transform: translateY(-2px);
        }

        .time-badge {
            font-size: 13px;
            font-weight: 600;
            color: var(--primary);
            margin-bottom: 8px;
        }

        .loc-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .loc-desc {
            font-size: 14px;
            color: var(--text-secondary);
            line-height: 1.5;
        }

        /* Distance Panel */
        .distance-panel {
            position: absolute;
            bottom: 24px;
            right: 24px;
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 16px 24px;
            border-radius: 16px;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 4px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .dist-value {
            font-size: 24px;
            font-weight: 800;
            color: var(--primary);
        }

        .dist-label {
            font-size: 12px;
            color: var(--text-secondary);
            font-weight: 500;
        }

        /* Custom Map Marker */
        .custom-marker {
            width: 32px;
            height: 32px;
            background: var(--gradient-1);
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 14px;
            transition: transform 0.3s;
        }
        .custom-marker.active {
            transform: scale(1.3);
            border-color: #0f172a;
            z-index: 1000 !important;
        }

        /* Dark Theme Map Filters */
        .leaflet-layer,
        .leaflet-control-zoom-in,
        .leaflet-control-zoom-out,
        .leaflet-control-attribution {
            filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
        }

        @media (max-width: 768px) {
            body { flex-direction: column-reverse; }
            .sidebar { width: 100%; height: 50vh; }
            .map-container { height: 50vh; }
            .weather-badge { top: 12px; right: 12px; padding: 8px 12px; font-size: 12px; }
        }
    </style>
</head>
<body>
    <div class="sidebar">
        <div class="header">
            <a href="duanwu_comparison.html" class="back-btn">← 返回对比页</a>
            <h1 class="title">${data.title}</h1>
            <p style="color: var(--text-secondary); font-size: 14px; margin-top: 8px;">端午4天3晚详细行程与航线规划</p>
        </div>
        
        <div class="timeline-container" id="timeline">
            <!-- Rendered by JS -->
        </div>
    </div>

    <div class="map-container">
        <div class="weather-badge">
            <span class="weather-icon">${data.weatherIcon}</span>
            <div>
                <div style="color:var(--text-secondary); font-size:11px;">端午气象预测</div>
                <div>${data.weatherText}</div>
            </div>
        </div>
        <div id="map"></div>
        <div class="distance-panel" id="distance-panel" style="display: none;">
            <div class="dist-label">距离上一站</div>
            <div class="dist-value" id="dist-value">0 km</div>
        </div>
    </div>

    <!-- Leaflet JS -->
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
        const tripData = ${JSON.stringify(data.days)};
        
        let map;
        let markers = [];
        let polyline;
        
        function initApp() {
            // Flatten locations for map
            const allLocations = [];
            let globalIndex = 1;
            
            tripData.forEach((day, dIdx) => {
                day.events.forEach((ev, eIdx) => {
                    if (ev.lat && ev.lng) {
                        ev.globalIndex = globalIndex++;
                        allLocations.push(ev);
                    }
                });
            });

            // Initialize Map
            map = L.map('map', {
                zoomControl: false,
                attributionControl: false
            });

            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                maxZoom: 19
            }).addTo(map);

            if (allLocations.length > 0) {
                // Fit bounds
                const bounds = L.latLngBounds(allLocations.map(loc => [loc.lat, loc.lng]));
                map.fitBounds(bounds, { padding: [50, 50] });

                // Draw line
                const pathCoords = allLocations.map(loc => [loc.lat, loc.lng]);
                polyline = L.polyline(pathCoords, {
                    color: '#818cf8',
                    weight: 3,
                    opacity: 0.5,
                    dashArray: '10, 10'
                }).addTo(map);

                // Add markers
                allLocations.forEach((loc, index) => {
                    const icon = L.divIcon({
                        className: 'custom-marker',
                        html: \`<span>\${loc.globalIndex}</span>\`,
                        iconSize: [32, 32],
                        iconAnchor: [16, 16]
                    });

                    const marker = L.marker([loc.lat, loc.lng], { icon })
                        .addTo(map)
                        .bindPopup(\`<b>\${loc.title}</b><br>\${loc.time}\`);
                    
                    marker.locData = loc;
                    marker.index = index;
                    markers.push(marker);
                });
            }

            renderTimeline();
        }

        function calculateDistance(lat1, lon1, lat2, lon2) {
            const R = 6371; // km
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                      Math.sin(dLon/2) * Math.sin(dLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return (R * c).toFixed(1);
        }

        function renderTimeline() {
            const container = document.getElementById('timeline');
            let html = '';
            
            tripData.forEach((day, dIdx) => {
                html += \`<div class="day-header">📅 \${day.day}</div>\`;
                
                day.events.forEach((ev, eIdx) => {
                    const hasMap = ev.lat && ev.lng;
                    const mapProps = hasMap ? \`onclick="focusLocation(\${ev.globalIndex - 1}, this)"\` : '';
                    const cursorStyle = hasMap ? 'cursor: pointer;' : 'cursor: default; opacity: 0.7;';
                    const numBadge = hasMap ? \`<span style="background: rgba(255,255,255,0.1); padding: 2px 8px; border-radius: 12px; font-size: 12px;">📍 \${ev.globalIndex}</span>\` : '';

                    html += \`
                        <div class="location-card" \${mapProps} style="\${cursorStyle}">
                            <div class="time-badge">\${ev.time}</div>
                            <div class="loc-title">\${ev.title} \${numBadge}</div>
                            <div class="loc-desc">\${ev.desc}</div>
                        </div>
                    \`;
                });
            });
            
            container.innerHTML = html;
        }

        function focusLocation(index, element) {
            if (index < 0 || index >= markers.length) return;
            
            // UI Update
            document.querySelectorAll('.location-card').forEach(el => el.classList.remove('active'));
            if(element) element.classList.add('active');

            const marker = markers[index];
            const loc = marker.locData;

            // Map Update
            map.flyTo([loc.lat, loc.lng], 14, {
                duration: 1.5,
                easeLinearity: 0.25
            });

            document.querySelectorAll('.custom-marker').forEach(el => el.classList.remove('active'));
            marker.getElement().classList.add('active');
            marker.openPopup();

            // Distance Calc
            const distPanel = document.getElementById('distance-panel');
            if (index > 0) {
                const prevLoc = markers[index - 1].locData;
                const dist = calculateDistance(prevLoc.lat, prevLoc.lng, loc.lat, loc.lng);
                document.getElementById('dist-value').innerText = dist + ' km';
                distPanel.style.display = 'flex';
            } else {
                distPanel.style.display = 'none';
            }
        }

        window.onload = initApp;
    </script>
</body>
</html>`;

const cities = [
    {
        filename: 'quanzhou.html',
        title: "泉州+潮州",
        weatherIcon: "🌤️",
        weatherText: "25-30℃ 多云间晴，体感湿热",
        days: [
            { day: "Day 1 (6月18日) - 古城初探", events: [
                { time: "14:15", title: "北京起飞 (厦航MF8128)", desc: "首都机场T3出发，直飞晋江。" },
                { time: "14:30", title: "上海起飞 (厦航MF8590)", desc: "虹桥机场T2出发，直飞晋江。" },
                { time: "16:15", title: "落地晋江机场", desc: "双城几乎同时落地，极度丝滑。", lat: 24.796, lng: 118.552 },
                { time: "17:30", title: "泉州西街民宿", desc: "办理入住，换上轻便透气的夏装。", lat: 24.918, lng: 118.580 },
                { time: "20:00", title: "钟楼夜景", desc: "打卡拍照，感受闽南夜生活。", lat: 24.917, lng: 118.587 }
            ]},
            { day: "Day 2 (6月19日) - 寻仙泉州", events: [
                { time: "09:30", title: "蟳埔村簪花", desc: "换上传统服饰或自带的素色裙子，化身赵丽颖同款。", lat: 24.861, lng: 118.636 },
                { time: "15:00", title: "开元寺漫游", desc: "游览东西塔，在红墙下拍照极其出片。", lat: 24.920, lng: 118.580 }
            ]},
            { day: "Day 3 (6月20日) - 潮州风情", events: [
                { time: "09:00", title: "泉州站出发", desc: "搭乘高铁前往潮汕站。", lat: 24.957, lng: 118.544 },
                { time: "11:30", title: "抵达潮汕站", desc: "抵达后打车前往潮州古城。", lat: 23.541, lng: 116.582 },
                { time: "15:00", title: "牌坊街Citywalk", desc: "换上复古旗袍或优雅长裙，漫步牌坊街。", lat: 23.666, lng: 116.643 },
                { time: "18:00", title: "广济桥夜景", desc: "韩江边看广济桥灯光秀。", lat: 23.665, lng: 116.649 }
            ]},
            { day: "Day 4 (6月21日) - 悠闲返程", events: [
                { time: "14:00", title: "揭阳潮汕机场", desc: "打车前往机场。", lat: 23.544, lng: 116.505 },
                { time: "16:00", title: "各自返程", desc: "上海: 春秋9C8958；北京: 南航CZ3861。" }
            ]}
        ]
    },
    {
        filename: 'chiangmai.html',
        title: "泰国清迈",
        weatherIcon: "🌦️",
        weatherText: "22-32℃ 高温高湿，午后阵雨",
        days: [
            { day: "Day 1 (6月18日) - 夜市初体验", events: [
                { time: "17:10", title: "上海起飞 (9C8511)", desc: "浦东T2直飞清迈。" },
                { time: "17:25", title: "北京起飞 (CA823)", desc: "首都T3直飞清迈。" },
                { time: "21:30", title: "落地清迈", desc: "清迈国际机场汇合，丝滑出关。", lat: 18.766, lng: 98.962 },
                { time: "22:30", title: "入住宁曼路", desc: "前往商圈高颜值精品酒店，出门吃夜市。", lat: 18.796, lng: 98.966 }
            ]},
            { day: "Day 2 (6月19日) - 塔佩门喂鸽", events: [
                { time: "11:00", title: "咖啡馆早午餐", desc: "穿法式茶歇裙，在网绿咖啡馆吃 Brunch 拍大片。", lat: 18.797, lng: 98.968 },
                { time: "14:00", title: "塔佩门", desc: "红砖墙背景下喂鸽子拍照，超级出片。", lat: 18.788, lng: 98.993 },
                { time: "16:00", title: "泰式马杀鸡", desc: "女子监狱按摩体验正宗泰式SPA。", lat: 18.785, lng: 98.988 }
            ]},
            { day: "Day 3 (6月20日) - 泰服体验", events: [
                { time: "10:30", title: "契迪龙寺", desc: "租泰服在古老遗迹前拍写真，高级感拉满。", lat: 18.786, lng: 98.986 },
                { time: "14:00", title: "双龙寺", desc: "包车上素贴山，俯瞰整个清迈城。", lat: 18.804, lng: 98.921 }
            ]},
            { day: "Day 4 (6月21日) - 采购与返程", events: [
                { time: "10:00", title: "MAYA商场", desc: "做最后的血拼，买泰国特色伴手礼。", lat: 18.802, lng: 98.967 },
                { time: "15:00", title: "清迈机场", desc: "打车前往机场。", lat: 18.766, lng: 98.962 }
            ]}
        ]
    },
    {
        filename: 'hochiminh.html',
        title: "越南胡志明",
        weatherIcon: "🌧️",
        weatherText: "25-33℃ 湿热多雨，带伞备清凉夏装",
        days: [
            { day: "Day 1 (6月18日) - 法式初夜", events: [
                { time: "08:50", title: "直飞胡志明", desc: "上海东航MU281，北京南航CZ8139(中转)。" },
                { time: "13:30", title: "新山一机场", desc: "降落后打车前往第一郡。", lat: 10.818, lng: 106.658 },
                { time: "15:00", title: "第一郡法式酒店", desc: "入住换上清凉吊带裙。", lat: 10.776, lng: 106.700 },
                { time: "16:00", title: "咖啡公寓", desc: "阳台喝越南冰滴咖啡。", lat: 10.774, lng: 106.704 },
                { time: "19:00", title: "范五老街", desc: "体验背包客街夜生活。", lat: 10.767, lng: 106.692 }
            ]},
            { day: "Day 2 (6月19日) - 东方小巴黎", events: [
                { time: "09:30", title: "统一宫", desc: "步行前往参观历史遗迹。", lat: 10.777, lng: 106.695 },
                { time: "11:00", title: "红教堂 & 百年邮局", desc: "极佳的法式拍照背景。", lat: 10.779, lng: 106.699 }
            ]},
            { day: "Day 3 (6月20日) - 奥黛体验", events: [
                { time: "11:30", title: "粉红教堂", desc: "穿着奥黛在耶稣圣心堂猛按快门。", lat: 10.788, lng: 106.689 },
                { time: "14:00", title: "滨城市场", desc: "疯狂砍价买腰果、咖啡。", lat: 10.772, lng: 106.698 }
            ]},
            { day: "Day 4 (6月21日) - 返程", events: [
                { time: "12:30", title: "新山一机场", desc: "预留充足时间打车前往机场返程。", lat: 10.818, lng: 106.658 }
            ]}
        ]
    },
    {
        filename: 'mangshi.html',
        title: "芒市+腾冲",
        weatherIcon: "⛅",
        weatherText: "冰火两重天，芒市28℃，腾冲15℃需外套",
        days: [
            { day: "Day 1 (6月18日) - 初见芒市", events: [
                { time: "09:00", title: "长水机场", desc: "京沪早班机昆明汇合。", lat: 25.101, lng: 102.930 },
                { time: "16:00", title: "芒市机场", desc: "抵达芒市，换轻薄夏装。", lat: 24.398, lng: 98.530 },
                { time: "20:00", title: "勐焕大金塔", desc: "夜游金塔，极具异域风情。", lat: 24.425, lng: 98.601 }
            ]},
            { day: "Day 2 (6月19日) - 转战腾冲", events: [
                { time: "09:30", title: "勐焕大银塔", desc: "白塔非常适合拍东南亚度假大片。", lat: 24.425, lng: 98.601 },
                { time: "16:30", title: "和顺古镇", desc: "包车抵达腾冲和顺古镇，气温骤降，加外套！", lat: 25.011, lng: 98.455 }
            ]},
            { day: "Day 3 (6月20日) - 地热与古镇", events: [
                { time: "09:00", title: "腾冲热海", desc: "看“大滚锅”，煮鸡蛋。", lat: 24.950, lng: 98.441 },
                { time: "15:00", title: "古镇漫步", desc: "穿棉麻裙在青石板路上闲逛。", lat: 25.011, lng: 98.455 }
            ]},
            { day: "Day 4 (6月21日) - 返程", events: [
                { time: "09:30", title: "北海湿地", desc: "体验“草上飞”泛舟。", lat: 25.127, lng: 98.562 },
                { time: "14:00", title: "机场返程", desc: "腾冲或芒市起飞返程。" }
            ]}
        ]
    },
    {
        filename: 'guizhou.html',
        title: "贵州全线",
        weatherIcon: "🌧️",
        weatherText: "18-26℃ 完美避暑，多阴雨需防滑",
        days: [
            { day: "Day 1 (6月18日) - 爽爽贵阳", events: [
                { time: "13:00", title: "龙洞堡机场", desc: "京沪航班同时落地。", lat: 26.540, lng: 106.800 },
                { time: "16:00", title: "黔灵山公园", desc: "换上冲锋衣+运动鞋，看猴子。", lat: 26.602, lng: 106.691 }
            ]},
            { day: "Day 2 (6月19日) - 瀑布震撼", events: [
                { time: "10:00", title: "黄果树瀑布", desc: "特种兵徒步，穿雨衣越水帘洞。", lat: 25.992, lng: 105.666 },
                { time: "21:00", title: "千户苗寨", desc: "高铁转场，抵达苗寨入住。", lat: 26.495, lng: 108.170 }
            ]},
            { day: "Day 3 (6月20日) - 苗寨写真", events: [
                { time: "10:00", title: "苗服变装", desc: "唯一的小裙子时刻！租银饰苗服拍照。", lat: 26.495, lng: 108.170 }
            ]},
            { day: "Day 4 (6月21日) - 翡翠水", events: [
                { time: "09:00", title: "小七孔景区", desc: "看绝美绿宝石水色，继续拉练。", lat: 25.265, lng: 107.747 },
                { time: "15:00", title: "荔波站", desc: "坐高铁返回贵阳机场飞京沪。", lat: 25.405, lng: 107.886 }
            ]}
        ]
    },
    {
        filename: 'zhangjiajie.html',
        title: "张家界+长沙",
        weatherIcon: "☁️",
        weatherText: "长沙34℃酷热，张家界25℃多云海",
        days: [
            { day: "Day 1 (6月18日) - 辣妹聚首", events: [
                { time: "10:00", title: "黄花机场", desc: "飞抵长沙。", lat: 28.193, lng: 113.220 },
                { time: "14:00", title: "五一广场", desc: "入住酒店，换上Y2K辣妹装。", lat: 28.196, lng: 112.973 },
                { time: "18:00", title: "IFS国金中心", desc: "喝茶颜悦色，吃文和友小龙虾。", lat: 28.191, lng: 112.976 }
            ]},
            { day: "Day 2 (6月19日) - 转战张家界", events: [
                { time: "09:30", title: "橘子洲", desc: "与毛爷爷雕像合影。", lat: 28.174, lng: 112.961 },
                { time: "14:00", title: "张家界西站", desc: "坐城际列车前往。", lat: 29.176, lng: 110.457 },
                { time: "17:00", title: "武陵源", desc: "入住换下裙子，准备登山服。", lat: 29.351, lng: 110.547 }
            ]},
            { day: "Day 3 (6月20日) - 极限拉练", events: [
                { time: "09:00", title: "百龙天梯", desc: "进山，直达袁家界。", lat: 29.352, lng: 110.546 },
                { time: "10:30", title: "阿凡达悬浮山", desc: "高强度徒步看石英砂岩峰林。", lat: 29.350, lng: 110.545 }
            ]},
            { day: "Day 4 (6月21日) - 天门山", events: [
                { time: "08:00", title: "天门山索道", desc: "坐亚洲最长索道上山。", lat: 29.052, lng: 110.478 },
                { time: "16:00", title: "张家界荷花机场", desc: "腿已废，各自返程。" }
            ]}
        ]
    }
];

const outDir = path.join(__dirname, 'duanwu');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

cities.forEach(city => {
    const html = template(city);
    fs.writeFileSync(path.join(outDir, city.filename), html);
    console.log(`Generated ${city.filename}`);
});
