// 美食地图应用逻辑
(function () {
    'use strict';

    let currentFilter = 'all';
    let map;
    let markers = [];

    // 初始化
    document.addEventListener('DOMContentLoaded', function () {
        initializeFilters();
        renderFoodCards(restaurantsData);
        initializeMap();
    });

    // 初始化筛选器
    function initializeFilters() {
        const filterTabs = document.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const category = this.dataset.category;

                // 更新active状态
                filterTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // 筛选并重新渲染
                currentFilter = category;
                const filteredData = filterRestaurants(category);
                renderFoodCards(filteredData);
                updateMapMarkers(filteredData);
            });
        });
    }

    // 筛选餐厅
    function filterRestaurants(category) {
        if (category === 'all') {
            return restaurantsData;
        }
        return restaurantsData.filter(r => r.category === category);
    }

    // 渲染美食卡片
    function renderFoodCards(restaurants) {
        const grid = document.getElementById('foodGrid');
        grid.innerHTML = '';

        restaurants.forEach(restaurant => {
            const card = createFoodCard(restaurant);
            grid.appendChild(card);
        });
    }

    // 创建单个美食卡片
    function createFoodCard(restaurant) {
        const card = document.createElement('div');
        card.className = `food-card ${restaurant.category}`;
        card.dataset.coords = JSON.stringify(restaurant.coords);

        const categoryLabels = {
            'seafood': '🦞 海鲜',
            'japanese': '🍣 日料',
            'dongbei': '🥟 东北菜'
        };

        card.innerHTML = `
            <div class="food-card-header">
                <span class="food-category ${restaurant.category}">${categoryLabels[restaurant.category]}</span>
                <div class="food-card-title">
                    <span>${restaurant.name}</span>
                    <span class="food-price">¥${restaurant.price}</span>
                </div>
            </div>
            <div class="food-card-body">
                <div class="food-section">
                    <div class="food-section-title">
                        <span>⭐</span>
                        <span>推荐理由</span>
                    </div>
                    <ul class="food-list pros-list">
                        ${restaurant.pros.map(pro => `<li>${pro}</li>`).join('')}
                    </ul>
                </div>
                
                ${restaurant.cons.length > 0 ? `
                <div class="food-section">
                    <div class="food-section-title">
                        <span>⚠️</span>
                        <span>温馨提示</span>
                    </div>
                    <ul class="food-list cons-list">
                        ${restaurant.cons.map(con => `<li>${con}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
                
                <div class="food-section">
                    <div class="food-section-title">
                        <span>🍽️</span>
                        <span>必点菜品</span>
                    </div>
                    <ul class="food-list">
                        ${restaurant.mustTry.map(dish => `<li>${dish}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="food-address">
                    <span>📍</span>
                    <span>${restaurant.address}</span>
                </div>
                
                <button class="map-btn" onclick="zoomToRestaurant(${restaurant.coords[0]}, ${restaurant.coords[1]}, '${restaurant.name}')">
                    🗺️ 在地图上查看
                </button>
            </div>
        `;

        return card;
    }

    // 初始化地图
    function initializeMap() {
        map = L.map('map').setView([38.92, 121.62], 12);

        L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
            maxZoom: 19,
            subdomains: ['1', '2', '3', '4'],
            attribution: '&copy; <a href="https://www.amap.com/">高德地图</a>'
        }).addTo(map);

        addMapMarkers(restaurantsData);
    }

    // 添加地图标记
    function addMapMarkers(restaurants) {
        // 清除现有标记
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];

        const categoryIcons = {
            'seafood': '🦞',
            'japanese': '🍣',
            'dongbei': '🥟'
        };

        restaurants.forEach(restaurant => {
            const icon = L.divIcon({
                className: `custom-marker marker-${restaurant.category}`,
                html: categoryIcons[restaurant.category],
                iconSize: [32, 32],
                iconAnchor: [16, 16]
            });

            const marker = L.marker(restaurant.coords, { icon: icon }).addTo(map);

            marker.bindPopup(`
                <div style="text-align: center; padding: 8px;">
                    <strong style="font-size: 14px;">${restaurant.name}</strong><br>
                    <span style="color: #ff6b6b; font-weight: bold;">¥${restaurant.price}</span><br>
                    <span style="font-size: 12px; color: #666;">${restaurant.address}</span><br>
                    <div style="margin-top: 8px; font-size: 12px;">
                        <strong>必点:</strong> ${restaurant.mustTry.slice(0, 2).join('、')}
                    </div>
                </div>
            `);

            markers.push(marker);
        });
    }

    // 更新地图标记（根据筛选）
    function updateMapMarkers(restaurants) {
        addMapMarkers(restaurants);

        // 调整地图视野以包含所有标记
        if (restaurants.length > 0) {
            const bounds = L.latLngBounds(restaurants.map(r => r.coords));
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }

    // 缩放到特定餐厅（全局函数，供HTML调用）
    window.zoomToRestaurant = function (lat, lng, name) {
        map.setView([lat, lng], 16);

        // 打开对应的popup
        markers.forEach(marker => {
            const markerLatLng = marker.getLatLng();
            if (Math.abs(markerLatLng.lat - lat) < 0.001 && Math.abs(markerLatLng.lng - lng) < 0.001) {
                marker.openPopup();
            }
        });

        // 平滑滚动到地图
        document.getElementById('map').scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

})();
