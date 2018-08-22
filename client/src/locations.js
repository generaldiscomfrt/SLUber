let locations = [
    //improve search
    ['Frost Campus', 'NA'],
    ['Adorjan Hall', '38.638132', '-90.238986'],
    ['Bannister House', '38.6383319', '-90.23955090000004' ],
    ['Beracha Hall', '38.63566', '-90.2379889'],
    ['Biomedical Engineering Building (BME)', '38.6370922', '-90.2302262'],
    ['Boileau Hall', '38.6369624', '-90.24066920000001'],
    ['Brouster Hall', '38.6384023', '-90.24007540000002'],
    ['Busch Student Center (BSC)', '38.6350071', '-90.2329494'],
    ['Business School - front', '38.6373829', '-90.23569250000003'],
    ['Business School - circle', 'NA'],
    ['Chaifetz Arena VIP Entrance', '38.632511', '-90.22795500000001'],
    ['Chaifetz Arena Stop Sign', 'NA'],
    ['College Church', '38.6371465', '-90.23347030000002'],
    ['DuBourg Hall', '38.63661', '-90.23345719999998'],
    ['Fusz Hall', '38.6361395', '-90.23742900000002'],
    ['Fitzgerald Hall', '38.6365796', '-90.23096670000001'],
    ['Grand Forest Apartments', '38.6333725', '-90.23064269999998'],
    ['Grand Hall', '38.6347926', '-90.23407429999997'],
    ['Griesedieck Hall', '38.6354895', '-90.23466180000003'],
    ['Hotel Ignacio', '38.636735', '-90.22859390000002'],
    ['Il Monastero Banquet Center', '38.63438379999999', '-90.22290550000002'],
    ['Jesuit Hall', '38.6375549', '-90.23285779999998'],
    ['Laclede Garage', '38.6345028', '-90.2358046'],
    ['Littiken Hall', '38.635901', '-90.2276099'],
    ['Manresa Center', '38.6431967', '-90.24166249999996'],
    ['Marchetti East', '38.6337947', '-90.23202830000002'],
    ['Marchetti West', '38.6337183', '-90.23292320000002'],
    ['Marguerite Hall', '38.6375007', '-90.23936839999999'],
    ['McDonnell Douglas Hall (MDH)', '38.6362464', '-90.22963579999998'],
    ['McGannon Hall', '38.6380384', '-90.23844509999998'],
    ['Morrissey', '38.6376623', '-90.2369789'],
    ['Olive Compton Garage', '38.635985', '-90.22833600000001'],
    ['Parks Airport', 'NA'],
    ['Pius Circle', '38.636567', '-90.23509000000001'],
    ['Pruellage', '38.6372154', '-90.238722'],
    ['Queen\'s Daughters Hall', '38.6379575', '-90.2374504'],
    ['ROTC Building', '38.6338719', '-90.23525519999998'],
    ['Reinert Hall', '38.6326351', '-90.2352505'],
    ['Ritter Hall', '38.6360295', '-90.23270860000002'],
    ['Simon Rec Center', '38.6352391', '-90.23574819999999'],
    ['Spring Hall', '38.6353821', '-90.23745889999998'],
    ['Tegeler Hall', '38.6367108', '-90.23164650000001'],
    ['Vandeventer Field', '38.63636', '-90.24105800000001'],
    ['Verhaegen Hall', '38.6371937', '-90.23413470000003'],
    ['Village Apartments', '38.6364728', '-90.23853050000002'],
    ['Wool Center', '38.637238', '-90.23150099999998'],
    ['Xavier Hall', '38.6371872', '-90.23767609999999'],
    ['Medical Campus', 'NA'],
    ['Anheuser Busch Institute (ABI)', '38.615616', '-90.24081130000002'],
    ['Cardinal Glennon', '38.6221908', '-90.23846659999998'],
    ['Casa de Salud', '38.6242559', '-90.23031960000003'],
    ['Crave', '38.621891', '-90.23538200000002'],
    ['The Creamery', 'NA'],
    ['Doisy Research Center (DRC)', '38.6243182', '-90.23624369999999'],
    ['Education Union (EDU)', '38.6228392', '-90.23567980000001'],
    ['Hickory Garage East', '38.62351900000001', '-90.23431099999999'],
    ['Hickory Garage West', '38.6237039', '-90.23519699999997'],
    ['Learning Resources Center (LRC)', '38.6222475', '-90.23682839999998'],
    ['Russell Apartments', 'NA'],
    ['SLU Hospital - Vista Entrance', '38.6225487', '-90.24066069999998'],
    ['Salus Center', '38.617356', '-90.23882800000001'],
    ['Schwitalla Hall - Grand Entrance', '38.62217940000001', '90.2377323'],
    ['Saum Apartments', '38.614559', '-90.24034599999999'],
    ['Theresa Lofts', '38.61996789999999', '-90.2369463'],
    ['Off Campus', 'NA'],
    ['3949 Lindell', '38.6400341', '-90.24271750000003'],
    ['Almost Home', '38.61870870000001', '-90.232215'],
    ['Cafe Ventana', '38.637966', '-90.24215400000003'],
    ['CVS', '38.63951309999999', '-90.2420371'],
    ['Continental Life Building', '38.6385797', '-90.23260119999998'],
    ['Coronado', '38.638443', '-90.23665299999999'],
    ['Donatello Apartments', '38.637606', '-90.24383799999998'],
    ['Drake Apartments', '38.6363376', '-90.2268479'],
    ['The Fox Theatre', '38.638903', '-90.23184500000002'],
    ['The Gallery Apartments on Washington', '38.644665', '-90.24467099999998'],
    ['Gerhart Lofts', '38.63584', '-90.24227200000001'],
    ['Icon Apartments', '38.6320227', '-90.2333342'],
    ['Laclede Lofts', '38.63698', '-90.24399'],
    ['Leonardo Apartments', '38.6400072', '-90.24824810000001'],
    ['Lindell East', 'NA'],
    ['Lindell Place', '38.6386918', '-90.2379889'],
    ['Lindell West', 'NA'],
    ['Melrose Apartments', 'NA'],
    ['Metro Northbound', 'NA'],
    ['Metro Southbound', 'NA'],
    ['Michaelangelo Apartments', '38.6387176', '-90.24535689999999'],
    ['Moolah Temple', '38.6391939', '-90.23896079999997'],
    ['PW Shoe Lofts', '38.6370372', '-90.22909979999997'],
    ['Pappy\'s', '38.63499660000001', '-90.22396449999997'],
    ['Spring Street Lofts', '38.6344938', '-90.23735590000001'],
    ['The Standard - on Forest Park', '38.63507980000001', '-90.24121450000001'],
    ['University Heights Lofts', '38.6352479', '-90.23811890000002'],
    ['Vandy Apartments', 'NA'],
    ['Vito\'s', '38.63702209999999', '-90.23059890000002'],
    ['West Pine Lofts - East door', '38.6380358', '-90.24511089999999'],
    ['West Pine Lofts - West door', 'NA'],
    ['Westminster Place', '38.64161239999999', '-90.24222270000001'],
    ['Intersections', 'NA'],
    ['Olive & Compton', 'NA'],
    ['Russell & Compton', 'NA'],
    ['Russell & Grand', 'NA'],
    ['Russell & Spring', 'NA'],
    ['Sarah & Lindell', 'NA']

];

module.exports = locations;