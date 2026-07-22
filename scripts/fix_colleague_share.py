# -*- coding: utf-8 -*-
"""
Fix colleague share:
1. Grammar in preview — "designed to help FQHCs" needs "address" before the problem text
2. Fallback to mailto when /api/contact fails (local testing)
"""

filepath = "C:/Users/adeto/quantum5d-website/public/quantum5d-site-index.html"

with open(filepath, "r", encoding="utf-8") as f:
    c = f.read()

count = 0

# 1. Fix preview grammar
old_preview = "sender+' thought you might be interested in <strong>'+appName+'</strong>, a Quantum5D.ai application designed to help FQHCs '+prob.charAt(0).toLowerCase()+prob.slice(1).replace(/\\.$/,'')"
new_preview = "sender+' thought you might be interested in <strong>'+appName+'</strong>, a Quantum5D.ai application designed to help FQHCs address a critical challenge: '+prob.replace(/\\.$/,'')"

if old_preview in c:
    c = c.replace(old_preview, new_preview, 1)
    count += 1
    print("OK: preview grammar fixed")
else:
    print("MISS: preview grammar")

# 2. Fix the body text in sendColleagueShare too
old_body = "' thought you might be interested in '+appName+', a Quantum5D.ai application designed to help FQHCs '+prob.charAt(0).toLowerCase()+prob.slice(1).replace(/\\.$/,'')"
new_body = "' thought you might be interested in '+appName+', a Quantum5D.ai application designed to help FQHCs address a critical challenge: '+prob.replace(/\\.$/,'')"

if old_body in c:
    c = c.replace(old_body, new_body, 1)
    count += 1
    print("OK: send body grammar fixed")
else:
    print("MISS: send body grammar")

# 3. Add mailto fallback in the catch block
old_catch = """}).catch(function(){
    if(note)note.textContent='Something went wrong. Try the email share button instead.';
  });
}"""

new_catch = """}).catch(function(){
    // Fallback: open mailto with the branded message
    var fallbackSubject=senderName+' recommends '+appName+' — Quantum5D.ai';
    var fallbackBody=senderName+(senderOrg?' at '+senderOrg:'')+' thought you might be interested in '+appName+', a Quantum5D.ai application designed to help FQHCs address a critical challenge: '+prob.replace(/\\.$/,'')+'.'+(optMsg?'\\n\\nMessage: '+optMsg:'')+'\\n\\nExplore '+appName+': https://quantum5d.ai/#app/'+appId+'\\n\\nQuantum5D.ai — The AI Operating System for Federally Qualified Health Centers';
    window.open('mailto:'+recipientEmail+'?subject='+encodeURIComponent(fallbackSubject)+'&body='+encodeURIComponent(fallbackBody));
    if(note)note.textContent='Opening your email client with the introduction ready to send.';
    if(typeof trackEvent==='function')trackEvent('application_share_colleague',{app:appId,method:'mailto_fallback'});
  });
}"""

if old_catch in c:
    c = c.replace(old_catch, new_catch, 1)
    count += 1
    print("OK: mailto fallback added")
else:
    print("MISS: catch block")

with open(filepath, "w", encoding="utf-8") as f:
    f.write(c)

print(f"\nDone. {count} fixes applied.")
